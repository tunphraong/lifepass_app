import React, { useState } from "react";
import { Container, Text, Avatar, Stack } from "@mantine/core";
import styles from "./TestimonialSection.module.css";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  avatar: string;
}

const avatars = [
  "/testimonials/1.jpg?height=80&width=80",
  "/testimonials/2.jpeg?height=80&width=80",
];

export default function TestimonialSection() {
 const t = useTranslations("TestimonialSection");

 const rawTestimonials = t.raw("testimonials");
 const testimonials: Testimonial[] = Array.isArray(rawTestimonials)
   ? rawTestimonials.map((testimonial, index) => ({
       id: index + 1,
       name: testimonial.name,
       content: testimonial.content,
       avatar: avatars[index],
     }))
   : [];

    const [activeTestimonial, setActiveTestimonial] = useState(
      testimonials[0] || null
    );

  return (
    <div className={styles.container}>
      <Container size="lg">
        <div className={styles.content}>
          <Text className={styles.title}>{t("title")}</Text>
          <Stack>
            <div className={styles.testimonialCard}>
              <Text className={styles.quoteMarks}>"</Text>
              <Text size="xl" mb="md">
                {activeTestimonial.content}
              </Text>
              <Text fw={700}>{activeTestimonial.name}</Text>
            </div>
            <div className={styles.avatarContainer}>
              {testimonials.map((testimonial) => (
                <Avatar
                  key={testimonial.id}
                  src={testimonial.avatar}
                  size="lg"
                  className={`${styles.avatar} ${
                    activeTestimonial.id === testimonial.id
                      ? styles.activeAvatar
                      : ""
                  }`}
                  onClick={() => setActiveTestimonial(testimonial)}
                />
              ))}
            </div>
          </Stack>
        </div>
      </Container>
    </div>
  );
}
