import { Container, Title, Accordion, AccordionItem, AccordionControl, AccordionPanel } from "@mantine/core";
import classes from "./FaqSimple.module.css";
import React from "react";

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export default function FaqSimple() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <AccordionItem className={classes.item} value="reset-password">
          <AccordionControl>
            Làm thế nào để đặt lịch sử dụng dịch vụ trên LifePass?
          </AccordionControl>
          <AccordionPanel>
            Để đặt lịch trên LifePass, bạn chỉ cần đăng nhập vào tài khoản của
            mình, chọn hoạt động bạn muốn tham gia và chọn lịch trình phù hợp.
            Sau đó, hoàn tất thanh toán và bạn đã sẵn sàng tham gia!
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="another-account">
          <AccordionControl>
            LifePass hỗ trợ những loại hoạt động nào?
          </AccordionControl>
          <AccordionPanel>
            LifePass cung cấp đa dạng các hoạt động từ yoga, gym, dance đến bơi
            lội và spa. Bạn có thể dễ dàng tìm thấy và tham gia các lớp học và
            dịch vụ thể thao yêu thích tại các địa điểm gần bạn.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="newsletter">
          <AccordionControl>
            Làm thế nào để tìm kiếm các địa điểm thể thao và làm đẹp trên
            LifePass?
          </AccordionControl>
          <AccordionPanel>
            Để tìm kiếm các địa điểm thể thao và làm đẹp trên LifePass, bạn có
            thể sử dụng chức năng tìm kiếm trên ứng dụng hoặc trang web của
            chúng tôi. Bạn có thể lọc theo địa điểm, loại hình hoạt động và thời
            gian phù hợp với lịch trình của bạn.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="credit-card">
          <AccordionControl>
            Tôi có thể hủy đặt lịch trên LifePass như thế nào?
          </AccordionControl>
          <AccordionPanel>
            Để hủy đặt lịch trên LifePass, bạn cần truy cập vào tài khoản của
            mình, chọn lịch đã đặt và chọn tùy chọn hủy đặt lịch. Vui lòng xem
            lại chính sách hủy để biết thêm chi tiết về các điều khoản và điều
            kiện áp dụng.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className={classes.item} value="payment">
          <AccordionControl>
            Tôi cần hỗ trợ hoặc có câu hỏi thêm, tôi có thể liên hệ với LifePass
            như thế nào?
          </AccordionControl>
          <AccordionPanel>
            Để được hỗ trợ, bạn có thể liên hệ với đội ngũ chăm sóc khách hàng
            của chúng tôi qua email support@lifepass.one. Chúng tôi luôn sẵn
            sàng hỗ trợ bạn mọi lúc.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
