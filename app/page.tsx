import styles from './app/page.module.css';
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header></Header>
      <section className={styles.section}>
        <div className={styles.container}>
          <a
            href="https://tally.so/r/wbl1bL"
            className={styles.alert}
            role="alert"
          >

            <span>New</span>
            <span>Nhận ngay một tuần tập luyện miễn phí!</span>

            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className={styles.headerTitle}>
            Một app cho tất cả mọi thứ liên quan tới thể dục, thể hình và làm đẹp
          </h1>
          <p className={styles.headerSubtitle}>
            Bạn có thể đi hàng trăm fitness studio, gym, spa và cơ sở làm đẹp trên khắp Việt Nam chỉ với một app LifePass
          </p>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaButton}>
              <div>
                <a href="https://tally.so/r/wbl1bL">
                  <span>Tham gia</span>
                </a>
              </div>
            </div>
            <div className={`${styles.ctaButton} ${styles.learnMoreButton}`}>
              <div>
                <a href="/learn">
                  <span>Tìm hiểu thêm về LifePass</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Content></Content>
      <Footer></Footer>
    </main>
  );
}
