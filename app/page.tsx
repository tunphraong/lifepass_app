// import Feature from "./components/Feature";
// import HowItWorks from "./components/HowItWorks";
import Content from "./components/Content";
import Header from "./components/Header";
import { FooterCentered } from "./components/FooterCentered";

export default function Home() {
  return (
    <main>
      <Header></Header>
      <section className="dark:bg-gray-900 justify-center">
        <div className="pt-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:px-12">
          <a
            href="https://tally.so/r/wbl1bL"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-yellow rounded-full text-white px-4 py-1.5 mr-3">
              New
            </span>{" "}
            <span className="text-sm font-medium">
              Nhận ngay một tuần tập luyện miễn phí!
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Một app cho tất cả mọi thứ liên quan tới thể dục, thể hình và làm
            đẹp
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Bạn có thể đi hàng trăm fitness studio, gym, spa và cơ sở làm đẹp
            trên khắp Việt Nam chỉ với một app LifePass
          </p>
          <div
            className="flex flex-col mt-8 space-y-4 
                            sm:justify-center sm:space-y-0 sm:space-x-4
                            max-w-[324px] mx-auto dark:bg-gray-900"
          >
            {/* <a href="https://tally.so/r/wbl1bL" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-yellow
                         hover:bg-orange
                            focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 
                            rounded-lg">
                            Tham Gia
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a> */}
            <div className="cmsHero_cta mt-0 mx-0 mb-3 block min-[320px]:mt-0">
              <div className="text-center">
                <a
                  className="m-0 text-[#05f] "
                  href="https://tally.so/r/wbl1bL"
                >
                  <span
                    className="text-[#fff] bg-yellow border-[#05f] w-full pl-0 pr-0 min-w-auto
                                     pt-4 pb-3.5 relative inline-block m-0 rounded-full font-medium leading-none
                                     hover:bg-orange"
                  >
                    Tham gia
                  </span>
                </a>
              </div>
            </div>

            <div className="cmsHero_cta mt-0 mx-0 mb-3 block min-[320px]:mt-0 sm:!mx-0">
              <div className="text-center">
                <a className="m-0 text-[#05f]" href="/learn">
                  <span
                    className="text-yellow bg-transparent border border-solid border-yellow w-full px-0 min-w-auto
                                     pt-4 pb-3.5 relative inline-block m-0 rounded-full font-medium leading-none
                                     hover:bg-grey"
                  >
                    Tìm hiểu thêm về LifePass
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Content></Content>
      <FooterCentered />
    </main>
  );
}
