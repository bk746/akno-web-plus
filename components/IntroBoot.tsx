import Script from "next/script";

const introBootScript = `(function(){try{var path=window.location.pathname;if(path!=='/'&&path!==''){document.documentElement.classList.add('intro-complete');return;}if(sessionStorage.getItem('akno-intro-seen')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-complete');}}catch(e){document.documentElement.classList.add('intro-complete');}})();`;

export function IntroBoot() {
  return (
    <Script id="intro-boot" strategy="beforeInteractive">
      {introBootScript}
    </Script>
  );
}
