import React, { useState } from "react";
import { Container, Text, Avatar, Stack, Badge } from "@mantine/core";
import styles from "./TestimonialSection.module.css";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Duc Nguyen",
    content:
      "1st time I used LifePass to book a cold plunge session at REBORN Fitness & Health in Thao Dien, and it was an amazing experience! The booking process was smooth, and I felt well taken care of during the session. LifePass offers a great variety of wellness activities like cold plunges, swimming, and personalized gym sessions at discounted prices, making it easy to discover new experiences. I'm excited to book more sessions at different locations through LifePass in the future. Highly recommended!",
    avatar: "/testimonials/1.jpg?height=80&width=80",
  },
  {
    id: 2,
    name: "Miley Le",
    content:
      "I've never been more motivated to work out. The variety of sports and facilities available is amazing!",
    avatar: "/testimonials/2.jpeg?height=80&width=80",
  },
  // {
  //   id: 3,
  //   name: "Jane Smith",
  //   content:
  //     "LifePass has transformed my fitness routine. I love trying new sports every week!",
  //   avatar: "/placeholder.svg?height=80&width=80",
  // },
  // {
  //   id: 4,
  //   name: "Mike Johnson",
  //   content:
  //     "The flexibility to choose different activities has kept me engaged and excited about fitness.",
  //   avatar: "/placeholder.svg?height=80&width=80",
  // },
];

export default function TestimonialSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  return (
    <div className={styles.container}>
      <Container size="lg">
        {/* <Badge variant="filled" color="yellow" size="lg" radius="sm">
          Testimonials
        </Badge> */}
        <div className={styles.content}>
          <Text className={styles.title}>What our members think about us</Text>
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
