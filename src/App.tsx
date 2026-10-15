/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  X,
  Sparkles,
  Check,
  ShieldCheck,
  Box,
  Languages,
} from 'lucide-react';

interface FigurineItem {
  id: number;
  nameFa: string;
  nameEn: string;
  seriesFa: string;
  seriesEn: string;
  src: string;
  bg: string;
  panel: string;
  materialFa: string;
  materialEn: string;
  editionFa: string;
  editionEn: string;
  heightCm: number;
  descriptionFa: string;
  descriptionEn: string;
}

const IMAGES: FigurineItem[] = [
  {
    id: 1,
    nameFa: 'توتم شعله',
    nameEn: 'Flare Totem',
    seriesFa: 'سری ۰۱ · قبیله آتش',
    seriesEn: 'Series 01 · Ember Tribe',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    materialFa: 'وینیل مات و رزین ریخته‌گری',
    materialEn: 'Matte Vinyl & Cast Resin',
    editionFa: 'نسخه محدود ۴۵۰ عددی',
    editionEn: 'Edition of 450',
    heightCm: 22,
    descriptionFa:
      'مجسمه‌سازی با هندسه جسورانه و رنگ‌های گرم خاکی. ارسال در محفظه شیشه‌ای آکریلیک مخصوص کلکسیونرها.',
    descriptionEn:
      'Sculpted with bold geometries and warm earthen tones. Shipped in bespoke collector acrylic display casing.',
  },
  {
    id: 2,
    nameFa: 'جوانه سبز',
    nameEn: 'Verde Sprout',
    seriesFa: 'سری ۰۱ · قبیله جنگل',
    seriesEn: 'Series 01 · Canopy Clan',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    materialFa: 'بیورزین پرداخت دستی',
    materialEn: 'Hand-Polished Bio-Resin',
    editionFa: 'نسخه محدود ۳۵۰ عددی',
    editionEn: 'Edition of 350',
    heightCm: 24,
    descriptionFa:
      'طرحی اندام‌واره الهام‌گرفته از گیاهان زنده با بافت ملموس و پایه متعادل با وزن استاندارد.',
    descriptionEn:
      'An organic silhouette embodying botanical lifeforms with fine tactile finish and weighted base.',
  },
  {
    id: 3,
    nameFa: 'شکوفه آبنباتی',
    nameEn: 'Candy Blossom',
    seriesFa: 'سری ۰۱ · اودیسه شیرین',
    seriesEn: 'Series 01 · Sweet Odyssey',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    materialFa: 'پلی‌اورتان ساتن ابریشمی',
    materialEn: 'Silky Satin Polyurethane',
    editionFa: 'نسخه محدود ۵۰۰ عددی',
    editionEn: 'Edition of 500',
    heightCm: 21,
    descriptionFa:
      'زیبایی‌شناسی پاپ‌آرت با انحناهای نرم پاستلی و جزئیات ظریف پرداخت‌شده به دست هنرمند.',
    descriptionEn:
      'Vibrant pop-art aesthetic with smooth pastel curvature and delicate hand-finished detailing.',
  },
  {
    id: 4,
    nameFa: 'گلایدر آسمانی',
    nameEn: 'Aero Glider',
    seriesFa: 'سری ۰۱ · ناوگان افق',
    seriesEn: 'Series 01 · Stratos Fleet',
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    materialFa: 'کامپوزیت آنودایز و وینیل',
    materialEn: 'Anodized Composite & Vinyl',
    editionFa: 'نسخه محدود ۴۰۰ عددی',
    editionEn: 'Edition of 400',
    heightCm: 25,
    descriptionFa:
      'طراحی آیرودینامیک با الهام از سفینه‌های آینده، با گرادیان‌های فیروزه‌ای آرام و خطوط صیقلی.',
    descriptionEn:
      'Aerodynamic form inspired by futuristic skycraft, featuring serene cyan gradients and crisp edges.',
  },
];

const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeFractalNoise type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function toPersianDigits(num: number | string): string {
  return String(num).replace(/\d/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
}

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const animTimeoutRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Sync document direction with language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  // Preload all 4 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
      }
    };
  }, []);

  // Navigation handler with 650ms animation lock
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));

      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
      }
      animTimeoutRef.current = window.setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigate(lang === 'fa' ? 'prev' : 'next');
      } else if (e.key === 'ArrowLeft') {
        navigate(lang === 'fa' ? 'next' : 'prev');
      } else if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, lang]);

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
    touchStartXRef.current = null;
  };

  // Derive role for each image based on activeIndex
  const getRole = (index: number): 'center' | 'left' | 'right' | 'back' => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  // Compute per-role visual style
  const getRoleStyle = (role: 'center' | 'left' | 'right' | 'back'): React.CSSProperties => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : 0,
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'back':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
        };
    }
  };

  const currentFigurine = IMAGES[activeIndex];

  return (
    <div
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: currentFigurine.bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: lang === 'fa' ? "'Vazirmatn', sans-serif" : "'Inter', sans-serif",
      }}
    >
      <div
        className="relative w-full"
        style={{ height: '100vh', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url("${GRAIN_DATA_URI}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
          }}
          aria-hidden="true"
        />

        {/* 2. Giant ghost text "3D SHAPE" / "فرم سه‌بعدی" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none text-center px-4"
          style={{
            zIndex: 2,
            top: '18%',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: lang === 'fa' ? "'Vazirmatn', 'Anton', sans-serif" : "'Anton', sans-serif",
              fontSize: lang === 'fa' ? 'clamp(70px, 22vw, 320px)' : 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: '#ffffff',
              opacity: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: lang === 'fa' ? '-0.03em' : '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {lang === 'fa' ? 'فرم سه‌بعدی' : '3D SHAPE'}
          </span>
        </div>

        {/* 3. Top brand label */}
        <div
          className={`absolute top-6 ${
            lang === 'fa' ? 'right-4 sm:right-8' : 'left-4 sm:left-8'
          } flex items-center gap-2.5 sm:gap-3`}
          style={{ zIndex: 60 }}
        >
          <span
            className="text-xs sm:text-sm font-black uppercase text-white tracking-[0.18em]"
            style={{
              opacity: 0.95,
              letterSpacing: lang === 'fa' ? '0.08em' : '0.18em',
              fontFamily: lang === 'fa' ? "'Vazirmatn', sans-serif" : 'inherit',
            }}
          >
            {lang === 'fa' ? 'تون‌هاب' : 'TOONHUB'}
          </span>
          <span className="text-[11px] text-white/80 font-medium px-2 py-0.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xs">
            {lang === 'fa'
              ? `${toPersianDigits(activeIndex + 1)} از ۴`
              : `0${activeIndex + 1} / 04`}
          </span>
        </div>

        {/* Top Controls */}
        <div
          className={`absolute top-6 ${
            lang === 'fa' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'
          } flex items-center gap-2 sm:gap-3`}
          style={{ zIndex: 60 }}
        >
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === 'fa' ? 'en' : 'fa'))}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            aria-label="تغییر زبان / Switch Language"
            title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
          >
            <Languages size={14} className="opacity-80" />
            <span>{lang === 'fa' ? 'FA' : 'EN'}</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {IMAGES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isAnimating || idx === activeIndex) return;
                  setIsAnimating(true);
                  setActiveIndex(idx);
                  if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
                  animTimeoutRef.current = window.setTimeout(() => setIsAnimating(false), 650);
                }}
                aria-label={
                  lang === 'fa' ? `انتخاب ${item.nameFa}` : `Select ${item.nameEn}`
                }
                className="group py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded cursor-pointer"
              >
                <span
                  className={`block h-1.5 transition-all duration-300 rounded-full ${
                    idx === activeIndex
                      ? 'w-7 bg-white'
                      : 'w-2 bg-white/40 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((imgItem, index) => {
            const role = getRole(index);
            const style = getRoleStyle(role);

            return (
              <div
                key={imgItem.src}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  willChange: 'transform, filter, opacity',
                  transition:
                    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  ...style,
                }}
                onClick={() => {
                  if (role === 'left') navigate('prev');
                  if (role === 'right') navigate('next');
                }}
                className={`transition-shadow ${
                  role === 'left' || role === 'right'
                    ? 'cursor-pointer hover:opacity-100'
                    : role === 'center'
                    ? 'cursor-grab active:cursor-grabbing'
                    : 'pointer-events-none'
                }`}
                title={
                  lang === 'fa'
                    ? role === 'left'
                      ? 'مشاهده فیگور قبلی'
                      : role === 'right'
                      ? 'مشاهده فیگور بعدی'
                      : imgItem.nameFa
                    : role === 'left'
                    ? 'Click to view previous figurine'
                    : role === 'right'
                    ? 'Click to view next figurine'
                    : imgItem.nameEn
                }
              >
                <img
                  src={imgItem.src}
                  alt={
                    lang === 'fa'
                      ? `فیگور ${toPersianDigits(index + 1)} - ${imgItem.nameFa}`
                      : `Figurine ${index + 1} - ${imgItem.nameEn}`
                  }
                  draggable={false}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                  className="drop-shadow-2xl select-none"
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom content + nav buttons */}
        <div
          className={`absolute bottom-6 sm:bottom-20 ${
            lang === 'fa' ? 'right-4 sm:right-24 text-right' : 'left-4 sm:left-24 text-left'
          }`}
          style={{ zIndex: 60, maxWidth: '340px' }}
        >
          <p
            className="font-black uppercase tracking-wider mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{
              opacity: 0.95,
              letterSpacing: lang === 'fa' ? '0.01em' : '0.02em',
              fontFamily: lang === 'fa' ? "'Vazirmatn', sans-serif" : 'inherit',
            }}
          >
            {lang === 'fa' ? 'فیگورهای اختصاصی تون‌هاب' : 'TOONHUB FIGURINES'}
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm text-white/90 mb-4 sm:mb-5 leading-relaxed font-normal"
            style={{ opacity: 0.85, lineHeight: 1.6 }}
          >
            {lang === 'fa'
              ? 'اثری خیره‌کننده با ساخت ۳بعدی دقیق و بسته‌بندی ویژه کلکسیونری. کیفیتی رویایی با جزئیات چشم‌نواز دست‌ساز. هم‌اکنون سفارش دهید.'
              : 'The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.'}
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              aria-label={lang === 'fa' ? 'فیگور قبلی' : 'Previous figurine'}
              title={lang === 'fa' ? 'قبلی' : 'Previous'}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white cursor-pointer active:scale-95 hover:scale-108 hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all disabled:opacity-80 shadow-md"
              style={{
                backgroundColor: 'transparent',
                transition:
                  'transform 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {lang === 'fa' ? (
                <ArrowRight size={26} strokeWidth={2.25} />
              ) : (
                <ArrowLeft size={26} strokeWidth={2.25} />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              aria-label={lang === 'fa' ? 'فیگور بعدی' : 'Next figurine'}
              title={lang === 'fa' ? 'بعدی' : 'Next'}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white cursor-pointer active:scale-95 hover:scale-108 hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all disabled:opacity-80 shadow-md"
              style={{
                backgroundColor: 'transparent',
                transition:
                  'transform 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {lang === 'fa' ? (
                <ArrowLeft size={26} strokeWidth={2.25} />
              ) : (
                <ArrowRight size={26} strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>

        {/* 6. Bottom link "DISCOVER IT" / "مشاهده جزئیات" */}
        <a
          href="#discover"
          onClick={(e) => {
            e.preventDefault();
            setIsDrawerOpen(true);
          }}
          className={`group absolute bottom-6 sm:bottom-20 ${
            lang === 'fa' ? 'left-4 sm:left-10' : 'right-4 sm:right-10'
          } flex items-center gap-2 sm:gap-3 text-white no-underline select-none cursor-pointer`}
          style={{
            zIndex: 60,
            fontFamily: lang === 'fa' ? "'Vazirmatn', sans-serif" : "'Anton', sans-serif",
            fontSize: lang === 'fa' ? 'clamp(18px, 3.2vw, 44px)' : 'clamp(20px, 4vw, 56px)',
            fontWeight: lang === 'fa' ? 800 : 400,
            lineHeight: 1,
            letterSpacing: lang === 'fa' ? '-0.01em' : '-0.02em',
            textTransform: 'uppercase',
          }}
          aria-label={lang === 'fa' ? 'مشاهده مشخصات فیگور' : 'Discover Figurine Details'}
        >
          <span className="opacity-95 group-hover:opacity-100 transition-opacity duration-200">
            {lang === 'fa' ? 'مشاهده جزئیات' : 'DISCOVER IT'}
          </span>
          {lang === 'fa' ? (
            <ArrowLeft
              className="w-5 h-5 sm:w-8 sm:h-8 opacity-95 group-hover:opacity-100 group-hover:-translate-x-1.5 transition-all duration-200 shrink-0"
              strokeWidth={2.25}
            />
          ) : (
            <ArrowRight
              className="w-5 h-5 sm:w-8 sm:h-8 opacity-95 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-200 shrink-0"
              strokeWidth={2.25}
            />
          )}
        </a>
      </div>

      {/* Interactive Figurine Detail Drawer */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-70 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className={`relative w-full max-w-md h-full bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto ${
              lang === 'fa' ? 'text-right' : 'text-left'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              borderInlineStart: `4px solid ${currentFigurine.panel}`,
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span
                    className="text-xs uppercase font-bold tracking-widest text-white/70 block"
                    style={{ color: currentFigurine.panel }}
                  >
                    {lang === 'fa' ? currentFigurine.seriesFa : currentFigurine.seriesEn}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-black uppercase mt-1 text-white"
                    style={{
                      fontFamily: lang === 'fa' ? "'Vazirmatn', sans-serif" : "'Anton', sans-serif",
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {lang === 'fa' ? currentFigurine.nameFa : currentFigurine.nameEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label={lang === 'fa' ? 'بستن' : 'Close'}
                >
                  <X size={22} />
                </button>
              </div>

              <div
                className="mt-6 p-4 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: currentFigurine.bg,
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: `url("${GRAIN_DATA_URI}")`,
                    backgroundSize: '150px 150px',
                  }}
                />
                <img
                  src={currentFigurine.src}
                  alt={lang === 'fa' ? currentFigurine.nameFa : currentFigurine.nameEn}
                  className="h-44 sm:h-52 object-contain relative z-10 drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm text-white/80 leading-relaxed font-normal">
                  {lang === 'fa' ? currentFigurine.descriptionFa : currentFigurine.descriptionEn}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-white/50 block">
                      {lang === 'fa' ? 'نسخه کلکسیونی' : 'Edition'}
                    </span>
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                      {lang === 'fa' ? currentFigurine.editionFa : currentFigurine.editionEn}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-white/50 block">
                      {lang === 'fa' ? 'ارتفاع اثر' : 'Dimensions'}
                    </span>
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                      <Box size={14} className="text-blue-400 shrink-0" />
                      {lang === 'fa'
                        ? `${toPersianDigits(currentFigurine.heightCm)} سانتی‌متر`
                        : `${currentFigurine.heightCm} cm Tall`}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-lg border border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 block">
                    {lang === 'fa' ? 'متریال و ساخت' : 'Material & Craft'}
                  </span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">
                    {lang === 'fa' ? currentFigurine.materialFa : currentFigurine.materialEn}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 inline-block shadow-sm"
                      style={{ backgroundColor: currentFigurine.bg }}
                      title={lang === 'fa' ? 'رنگ پایه' : 'Primary Colorway'}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 inline-block shadow-sm"
                      style={{ backgroundColor: currentFigurine.panel }}
                      title={lang === 'fa' ? 'رنگ مکمل' : 'Accent Tint'}
                    />
                    <span className="text-xs text-white/60">
                      {lang === 'fa'
                        ? `پالت رنگی شماره ${toPersianDigits(activeIndex + 1)}`
                        : `Colorway #${activeIndex + 1}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
              {orderConfirmed ? (
                <div className="p-3.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
                  <Check size={18} className="shrink-0 text-emerald-400" />
                  <span>
                    {lang === 'fa'
                      ? `فیگور شماره ${toPersianDigits(currentFigurine.id)}۰۹ با موفقیت رزرو شد!`
                      : `Reserved figurine #${currentFigurine.id}09 for delivery preview!`}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setOrderConfirmed(true)}
                  className="w-full py-3.5 px-4 rounded-lg font-bold text-slate-950 uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
                  style={{ backgroundColor: currentFigurine.panel }}
                >
                  <Sparkles size={16} />
                  {lang === 'fa' ? 'ثبت سفارش و رزرو فیگور' : 'Claim Figurine'}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setOrderConfirmed(false);
                }}
                className="w-full py-2.5 text-xs text-white/70 hover:text-white uppercase tracking-widest text-center transition-colors cursor-pointer"
              >
                {lang === 'fa' ? 'بازگشت به ویترین' : 'Back to Carousel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
