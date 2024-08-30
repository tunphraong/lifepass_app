// lib/sendEmail.ts
import formData from "form-data";
import Mailgun from "mailgun.js";
import { createClient } from "../../../../utils/supabase/server";
import fs from "fs"; // To handle file system operations
import { createEvent, EventAttributes } from "ics";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

import "dayjs/locale/vi";
dayjs.locale("vi");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  public_key: process.env.MAILGUN_PUBLIC_KEY || "",
  key: process.env.MAILGUN_API_KEY || "",
});

export const sendConfirmationEmail = async (
  scheduleId: string,
  userId: string
) => {
  const supabase = createClient(); // Use the appropriate Supabase client (server or client, depending on the context)

  // 3. Fetch schedule details
  const { data: scheduleData, error: scheduleError } = await supabase
    .from("schedules")
    .select("*")
    .eq("id", scheduleId)
    .single();
  if (scheduleError) {
    throw new Error(
      `Failed to fetch schedule details: ${scheduleError.message}`
    );
  }

  // 4. Fetch user details
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("first_name, last_name, email")
    .eq("id", userId)
    .single();

  if (userError) {
    throw new Error(`Failed to fetch user details: ${userError.message}`);
  }

  try {
    // 1. Fetch class details
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("id", scheduleData.class_id)
      .single();
    if (classError) {
      throw new Error(`Failed to fetch class details: ${classError.message}`);
    }

    // 2. Fetch studio details
    const { data: studioData, error: studioError } = await supabase
      .from("studios")
      .select("*")
      .eq("id", scheduleData.studio_id)
      .single();
    if (studioError) {
      throw new Error(`Failed to fetch studio details: ${studioError.message}`);
    }

    // Create ICS Event
    const startTime = dayjs(scheduleData.start_time);
    const event: EventAttributes = {
      start: [
        startTime.year(),
        startTime.month() + 1,
        startTime.date(),
        startTime.hour(),
        startTime.minute(),
      ],
      duration: { minutes: classData.duration },
      title: `${user.first_name} ${user.last_name} at ${classData.name}`,
      description: `${user.first_name} ${user.last_name} will attend Class: ${classData.name} at ${scheduleData.start_time}`,
      location: studioData.address,
      status: "CONFIRMED",
    };

    createEvent(event, (error, value) => {
      if (error) {
        console.log("Error creating ICS file:", error);
        throw new Error(`Failed to create ICS event: ${error.message}`);
      }

      // Save the ICS content to a temporary file
      const icsFilePath = `/tmp/${classData.name}-${startTime.format(
        "YYYYMMDD"
      )}.ics`;
      fs.writeFileSync(icsFilePath, value);

      // 5. Construct and send the email with ICS attachment
      const msg = {
        from: "LifePass <no-reply@mg.lifepass.one>",
        to: studioData.email,
        subject: "Xác nhận đặt lớp thành công!",
        html: `
      <html>
        <body>
          <p>Dear ${studioData.name},</p>
          <p>Bạn có một booking mới cho lớp ${classData.name} on 
          ${dayjs(scheduleData.start_time)
            .tz("Asia/Ho_Chi_Minh")
            .format("dddd, DD MMMM YYYY HH:mm")}.</p>
          <p>Customer Name: ${user.first_name} ${user.last_name}</p>
          <p>Customer Email: ${user.email}</p>
          <p>Cảm ơn bạn đã đồng hành cùng LifePass!</p>
          <p>Trân trọng,</p>
          <p>Đội ngũ LifePass</p>
        </body>
      </html>
      `,
        attachment: {
          data: fs.createReadStream(icsFilePath),
          filename: "event.ics",
        },
      };

      // Send the email
      mg.messages
        .create(process.env.MAILGUN_DOMAIN, msg)
        .then((res) => console.log("Email sent:", res))
        .catch((err) => console.error("Error sending email:", err))
        .finally(() => {
          // Clean up: delete the temporary ICS file after sending the email
          fs.unlinkSync(icsFilePath);
        });
    });

    // 5. Construct and send the email
    const msg = {
      from: "LifePass <no-reply@mg.lifepass.one>",
      to: user.email,
      subject: "Xác nhận đặt lớp thành công!",
      html: `
        <html>
          <body>
            <p>Chào ${user.first_name} ${user.last_name},</p>
            <p>Cảm ơn bạn đã đặt lớp học với LifePass!</p>
            <p>Dưới đây là thông tin chi tiết về lớp học của bạn:</p>
            <h2>${classData.name}</h2>
            <p>Studio: ${studioData.name}</p>
            <p>Địa chỉ: ${studioData.address}</p>
            <p>Thời gian: 
            ${dayjs(scheduleData.start_time)
              .tz("Asia/Ho_Chi_Minh")
              .format("HH:mm dddd, DD MMMM YYYY ")}
            </p> 
            <p><strong>Lưu ý quan trọng: Vui lòng đưa email này (hoặc hiển thị trên điện thoại của bạn) cho nhân viên tại studio fitness trước khi vào lớp để xác nhận đặt chỗ của bạn.</strong></p>
            <p>Chúng tôi rất mong được gặp bạn ở lớp học!</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ LifePass</p>
          </body>
        </html>
      `,
    };

    // const msgToStudio = {
    //   from: "LifePass <no-reply@mg.lifepass.one>",
    //   to: studioData.email, // Assuming you have the studio's email in studioData
    //   subject: `New booking for ${classData.name}`,
    //   html: `
     
    // `,
    // };

    try {
      const userRes = await mg.messages.create(process.env.MAILGUN_DOMAIN, msg);
      console.log("Email sent to user:", userRes);

      // Send email to studio
      // const studioRes = await mg.messages.create(
      //   process.env.MAILGUN_DOMAIN,
      //   msgToStudio
      // );
      // console.log("Email sent to studio:", studioRes);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  } catch (error) {
    // Handle errors (e.g., log to an error tracking service)
    console.error("Error in sendConfirmationEmail:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};
