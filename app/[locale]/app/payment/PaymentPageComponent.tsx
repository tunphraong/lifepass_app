"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "../../../../navigation";
// import { usePathname } from "../../../../navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Group,
  Space,
  Alert,
  Text,
  Stack,
  Center,
  Loader,
  Radio,
  RadioGroup,
  Title,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Schedule, Class, Studio } from "../types";
import useSWR from "swr";
import dayjs from "dayjs";
const fetcher = (url: any) => fetch(url).then((res) => res.json());
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";
import Image from "next/image";
import classes from "./PaymentPage.module.css";
// require("dayjs/locale/vi");
import "dayjs/locale/vi";
dayjs.locale("vi");
interface User {
  id: string;
  email: string;
  // Add other necessary user fields here
}

const PaymentPageComponent = ({ userId }) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const localePrefix = parts.length > 1 ? `/${parts[1]}` : "";
  // console.log(localePrefix); // Example output: "/en"
  const t = useTranslations("PaymentPage");
  const format = useFormatter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("scheduleId") ?? null;
  const studioId = searchParams.get("studioId") ?? null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("zalopay");
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const {
    data: schedule,
    error: scheduleError,
    isLoading: isScheduleLoading,
  } = useSWR(`/api/schedule/${scheduleId}`, fetcher);

  const {
    data: studioData,
    isLoading: isStudioLoading,
    error: studioError,
  } = useSWR(
    schedule?.studio_id ? `/api/studio/${schedule?.studio_id}` : null,
    fetcher
  );

  const {
    data: classData,
    isLoading: isClassLoading,
    error: classError,
  } = useSWR(
    schedule?.studio_id ? `/api/class/${schedule?.class_id}` : null,
    fetcher
  );

  const {
    data: scheduleWithPrice,
    error: scheduleWithPriceError,
    isLoading: scheduleWithPriceLoading,
  } = useSWR(
    scheduleId ? `/api/studio/${studioId}/schedule/${scheduleId}` : null, // Change to new endpoint
    fetcher
  );

  if (scheduleWithPriceError) {
    console.log("scheduleWithPriceError", scheduleWithPriceError);
  }

  // console.log("schedule with price", scheduleWithPrice);

  const isLoading =
    isScheduleLoading ||
    isStudioLoading ||
    isClassLoading ||
    scheduleWithPriceLoading;
  const error =
    scheduleError || studioError || classError || scheduleWithPriceError;

  if (error) return <div>Error loading data. Please try again.</div>;
  if (isLoading) {
    return (
      <Center className="my-6">
        <Loader />
      </Center>
    );
  }
  if (!schedule || !studioData || !classData) return <div>Not found.</div>;

  // Calculate the end time based on duration
  const startTime = dayjs(schedule.start_time);
  const endTime = startTime.add(classData?.duration || 0, "minute");
  const dateTime = new Date(schedule.start_time);
  const formattedEndTime = endTime.format("h:mm A");

  const handlePayment = () => {
    // console.log("Selected payment method:", selectedPaymentMethod);
    // console.log("Proceed to payment for schedule:", schedule);
    // Implement payment logic here based on selectedPaymentMethod
    const paymentDetails = {
      amount: scheduleWithPrice.price - discountAmount,
      bank_code: "zalopayapp",
      schedule_id: schedule.id,
      user_id: userId,
      locale: localePrefix,
      discount_code: discountCode
    };

    fetch("/api/zalopay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Set the API error state if there's an error
          // setApiError(data.error); // Set the API error state
          setApiError(
            "Thanh toán không thành công. Xin liêc lạc với LifePass nếu vấn đề vẫn tiếp tục."
          );
          notifications.show({
            color: "red",
            title: "Payment error",
            message:
              "Thanh toán không thành công. Xin liêc lạc với LifePass nếu vấn đề vẫn tiếp tục.",
            autoClose: false,
            classNames: classes,
          });
        } else {
          router.push(data.order_url);
        }
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          title: "Payment error",
          message:
            "Thanh toán không thành công. Xin liêc lạc với LifePass nếu vấn đề vẫn tiếp tục.",
          autoClose: false,
          classNames: classes,
        });
        console.error("Error 123:", error);
        // Display error message to user
      });
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim() === "") {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Please enter a discount code.",
        autoClose: false,
        classNames: classes,
      });
      return;
    }

    fetch(`/api/apply-discount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discountCode, scheduleId, userId, originalPrice: scheduleWithPrice.price }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          notifications.show({
            color: "red",
            position: "top-center",
            title: "Discount error",
            message: data.error,
            autoClose: false, 
          });
        } else {
          console.log(data);
          setDiscountApplied(true);
          setDiscountAmount(data.discountAmount);
          notifications.show({
            color: "green",
            position: "top-center",
            title: "Discount Applied",
            message: `Discount of ${data.discountAmount} VND applied!`,
            autoClose: false,
          });
        }
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          position: "top-center",
          title: "Error",
          message:
            "There was an error applying the discount. Please try again.",
          autoClose: false,
        });
        console.error("Error:", error);
      });
  };


  return apiError ? (
    <Alert
      color="red"
      title="Error"
      withCloseButton
      onClose={() => setApiError(null)}
    >
      {apiError}
      <Button variant="outline" color="gray" onClick={() => router.back()}>
        Go Back
      </Button>
    </Alert>
  ) : (
    <Stack align="center" gap="md" mt={20}>
      <Text fw={500}>{t("selectPaymentMethod")}</Text>
      <Card shadow="sm" padding="sm" radius="md" withBorder>
        <Stack gap="lg">
          <Title order={3}>{studioData.name}</Title>
          <Text>
            {t("selectedClass")} {classData.name}
          </Text>
          {/* <Text>
            {t("price")}{" "}
            {(scheduleWithPrice?.price - discountAmount).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text> */}

          {discountApplied ? (
            <>
              <Text>
                {t("price")}{" "}
                <span className={classes.strikethrough}>
                  {scheduleWithPrice.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                {(scheduleWithPrice.price - discountAmount).toLocaleString(
                  "vi-VN",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </Text>
            </>
          ) : (
            <Text>
              {t("price")}{" "}
              {scheduleWithPrice.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          )}

          <Text>
            {t("date")}{" "}
            {format.dateTime(dateTime, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {/* {dayjs(schedule?.start_time).format("dddd, DD MMMM, YYYY")} */}
          </Text>
          <Text>
            {t("time")} {dayjs(schedule?.start_time).format("h:mm A")} -{" "}
            {dayjs(schedule?.start_time)
              .add(classData?.duration, "minute")
              .format("h:mm A")}
          </Text>

          <RadioGroup
            value={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
            // label=""
            label={t("choosePaymentMethod")}
            required
          >
            <Radio
              value="zalopay"
              label={
                <Group>
                  <Text>Zalopay</Text>
                  <Image
                    src="/payments/logo-zalopay.svg"
                    alt="Zalopay"
                    width={24}
                    height={24}
                  />
                </Group>
              }
            />
            {/* <Radio
              value="visa-mastercard-jcb"
              label={
                <div>
                  <Text>Visa, Mastercard, JCB (qua cổng ZaloPay)</Text>
                </div>
              }
            /> */}

            {/* <Radio
              value="zalopay"
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/payments/logo-zalopay.svg"
                    alt="ZaloPay"
                    width={24}
                    height={24}
                  />
                  <Text ml="xs">ZaloPay</Text>
                </div>
              }
            /> */}
            {/* <Radio
              value="atm"
              label={
                <div>
                  <Text>Thẻ ATM (qua cổng ZaloPay)</Text>
                </div>
              }
            /> */}
          </RadioGroup>

          <TextInput
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(event) => setDiscountCode(event.currentTarget.value)}
          />
          <Button fullWidth autoContrast={true} color="blue" onClick={handleApplyDiscount}>
            Apply Discount
          </Button>

          <Button
            fullWidth
            variant="filled"
            color="yellow"
            autoContrast={true}
            onClick={handlePayment}
          >
            {t("proceedToPayment")}
            {/* Proceed to Payment */}
          </Button>
        </Stack>
      </Card>
      {/* <Divider my="md" /> */}
      <Alert color="yellow" radius="md">
        <Group>
          <Text fw={500} size="md">
            {t("note")}
          </Text>
          <Text size="sm">{t("cancellationPolicy")}</Text>
        </Group>
      </Alert>
    </Stack>
  );
};

export default PaymentPageComponent;
