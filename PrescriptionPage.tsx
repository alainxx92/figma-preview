import React, { useState, useRef, useCallback } from "react";

// ── Design Tokens ───────────────────────────────────────────────
const T = {
  primary:     "#2D3035",
  secondary:   "#757C89",
  tertiary:    "#9CA1AA",
  hint:        "#C6C9CE",
  border:      "#E9EBEC",
  disable:     "#DBDDE0",
  bgLight:     "#F1F1F1",
  brand:       "#FF4081",
  brandDeep:   "#EA306F",
  brandBorder: "#FF5D94",
  red:         "#F33F46",
  white:       "#FFFFFF",
};
const FONT = "'Lific', 'Pretendard', sans-serif";

// ── Data ────────────────────────────────────────────────────────
const BRANDS = [
  { id: "royal", label: "로얄캐닌", color: "#C8102E" },
  { id: "hills", label: "힐스",    color: "#005DAA" },
];
const PET_TYPES = ["강아지", "고양이"];
const CATEGORIES = [
  "요로기계", "신장계",   "소화기계",
  "피부/알러지","간/심장",  "관절",
  "신경계",  "체중/당뇨", "회복/기타",
];
const PRODUCTS = [
  { id: 1, name: "로얄캐닌 캣 하이포알러제닉 2.5kg", discount: 10, price: "44,700", originalPrice: "49,700원", coupon: "5,000원 쿠폰 적용됨", rating: 4, reviews: 213, brandColor: "#C8102E" },
  { id: 2, name: "힐스 캣 C/D 멀티케어 메타볼릭 1.5kg", discount: 15, price: "38,200", originalPrice: "44,900원", coupon: "3,000원 쿠폰 적용됨", rating: 4, reviews: 87,  brandColor: "#005DAA" },
  { id: 3, name: "로얄캐닌 캣 리날 레나 고양이 2kg",    discount: 10, price: "52,100", originalPrice: "57,900원", coupon: "5,000원 쿠폰 적용됨", rating: 5, reviews: 341, brandColor: "#C8102E" },
];

// ── Primitive Components ────────────────────────────────────────

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 20, height: 20, borderRadius: 4, flexShrink: 0, cursor: "pointer",
        border: `2px solid ${checked ? T.brand : T.disable}`,
        backgroundColor: checked ? T.brand : T.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all .15s",
      }}
    >
      {checked && (
        <svg width={11} height={9} viewBox="0 0 11 9" fill="none">
          <path d="M1 4L4 7.5L10 1" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} width={11} height={11} viewBox="0 0 12 12" fill={n <= rating ? "#FFC700" : T.border}>
          <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.1L6 7.96 3.22 9.56l.53-3.1L1.5 4.27l3.11-.45L6 1z" />
        </svg>
      ))}
    </div>
  );
}

function ImgPlaceholder({ size, radius = 8, color = "#DBDDE0" }: { size: number; radius?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, backgroundColor: color, flexShrink: 0 }} />
  );
}

function BrandLogo({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
  );
}

// ── StatusBar ───────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{ height: 44, backgroundColor: T.white, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 15, color: T.primary }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {/* Cellular */}
        <svg width={17} height={12} viewBox="0 0 17 12" fill={T.primary}>
          <rect x="0"  y="6" width="3" height="6" rx="0.5" />
          <rect x="4"  y="4" width="3" height="8" rx="0.5" />
          <rect x="8"  y="2" width="3" height="10" rx="0.5" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* Wifi */}
        <svg width={16} height={12} viewBox="0 0 16 12" fill="none" stroke={T.primary} strokeWidth={1.4} strokeLinecap="round">
          <path d="M1 4.5C3.8 1.8 12.2 1.8 15 4.5" />
          <path d="M3.2 7C5.1 5.2 10.9 5.2 12.8 7" />
          <path d="M5.5 9.5C6.5 8.6 9.5 8.6 10.5 9.5" />
          <circle cx="8" cy="11.5" r="0.8" fill={T.primary} stroke="none" />
        </svg>
        {/* Battery */}
        <svg width={25} height={12} viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke={T.primary} />
          <rect x="2"   y="2"   width="17" height="8"  rx="1.5" fill={T.primary} />
          <path d="M23 4v4" stroke={T.primary} strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ── AppBar ──────────────────────────────────────────────────────
function AppBar({ scrolled }: { scrolled: boolean }) {
  return (
    <div style={{
      height: 52, backgroundColor: T.white, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 8px", flexShrink: 0,
      boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
      transition: "box-shadow .2s",
    }}>
      <button style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke={T.primary} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={22} height={22} viewBox="0 0 22 22" fill="none" stroke={T.primary} strokeWidth={1.6} strokeLinecap="round">
          <path d="M19 11A8 8 0 1 1 3.6 7.5" />
          <path d="M3 4v4h4" />
        </svg>
      </button>
    </div>
  );
}

// ── InputField ──────────────────────────────────────────────────
function InputField({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, lineHeight: "18px", letterSpacing: "-0.26px", color: T.tertiary }}>
        {label}
      </span>
      <div style={{
        border: `1px solid ${T.border}`, borderRadius: 6,
        display: "flex", alignItems: "center", padding: "0 8px 0 16px", height: 52,
      }}>
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, border: "none", outline: "none", background: "none",
            fontFamily: FONT, fontWeight: 500, fontSize: 14,
            letterSpacing: "-0.28px", color: T.primary,
          }}
        />
        {value && (
          <button onClick={() => onChange("")} style={{ border: "none", background: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", color: T.hint }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <circle cx={8} cy={8} r={7} fill={T.border} />
              <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke={T.secondary} strokeWidth={1.4} strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ── ChoiceChip ──────────────────────────────────────────────────
function ChoiceChip({ label, selected, onClick, brandColor }: {
  label: string; selected: boolean; onClick: () => void; brandColor?: string;
}) {
  return (
    <button onClick={onClick} style={{
      height: 32, borderRadius: 100,
      border: `1px solid ${selected ? T.brand : T.border}`,
      backgroundColor: selected ? "#FFF0F5" : T.white,
      display: "inline-flex", alignItems: "center",
      gap: 4, padding: brandColor ? "4px 12px 4px 4px" : "4px 12px",
      cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s",
    }}>
      {brandColor && <BrandLogo color={brandColor} />}
      <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", color: selected ? T.brand : T.primary }}>
        {label}
      </span>
    </button>
  );
}

// ── CategoryGrid ────────────────────────────────────────────────
function CategoryGrid({ selected, onSelect }: { selected: string; onSelect: (c: string) => void }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {CATEGORIES.map((cat, i) => {
          const isSelected = selected === cat;
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <button key={cat} onClick={() => onSelect(isSelected ? "" : cat)} style={{
              height: 40, border: "none",
              backgroundColor: isSelected ? "#FFF0F5" : T.white,
              borderRight:  col < 2 ? `1px solid ${T.border}` : "none",
              borderBottom: row < 2 ? `1px solid ${T.border}` : "none",
              cursor: "pointer", fontFamily: FONT, fontWeight: 400, fontSize: 14,
              letterSpacing: "-0.28px", color: isSelected ? T.brand : T.secondary,
              transition: "all .15s",
            }}>
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── ProductCard ─────────────────────────────────────────────────
function ProductCard({ product, checked, onToggle }: {
  product: typeof PRODUCTS[0]; checked: boolean; onToggle: () => void;
}) {
  return (
    <div style={{
      border: `1px solid ${checked ? T.brand : T.bgLight}`,
      borderRadius: 8, padding: 16,
      display: "flex", gap: 14, position: "relative",
      backgroundColor: checked ? "#FFF8FB" : T.white,
      transition: "all .15s",
    }}>
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <Checkbox checked={checked} onChange={onToggle} />
      </div>

      {/* 상품 이미지 placeholder */}
      <div style={{ marginLeft: 28, flexShrink: 0, borderRadius: 8, overflow: "hidden" }}>
        <ImgPlaceholder size={100} color="#DBDDE0" radius={8} />
      </div>

      {/* 상품 정보 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: FONT, fontWeight: 500, fontSize: 13, lineHeight: "18px", letterSpacing: "-0.26px", color: T.primary }}>
          {product.name}
        </p>

        <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 4 }}>
          <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 12, letterSpacing: "-0.24px", color: T.red }}>쿠폰 적용가</span>
          <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 12, letterSpacing: "-0.24px", color: T.tertiary, textDecoration: "line-through" }}>{product.originalPrice}</span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 2 }}>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: T.red }}>{product.discount}%</span>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: T.primary }}>{product.price}</span>
          <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", color: T.primary }}>원</span>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, border: `1px solid ${T.brandBorder}`, borderRadius: 4, padding: "2px 6px", marginTop: 5, alignSelf: "flex-start" }}>
          <svg width={10} height={10} viewBox="0 0 10 10" fill={T.brandDeep}>
            <path d="M5 0.5C3.2 0.5 1.5 1.8 1 3.5H0l1.5 2L3 3.5H2c.5-1.2 1.6-2 3-2 1.8 0 3.2 1.4 3.2 3.2S6.8 7.9 5 7.9c-.9 0-1.7-.4-2.3-.9L2 8.1C2.8 8.8 3.8 9.2 5 9.2 7.3 9.2 9.2 7.3 9.2 5S7.3 0.5 5 0.5z" />
          </svg>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 10, letterSpacing: "-0.2px", color: T.brandDeep }}>{product.coupon}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 5 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 12, letterSpacing: "-0.24px", color: T.tertiary }}>({product.reviews})</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill={T.brand}>
            <path d="M7 1C4 1 1.5 3.5 1.5 6.5c0 2.5 1.7 4.7 4 5.4V13h3v-1.1c2.3-.7 4-2.9 4-5.4C12.5 3.5 10 1 7 1z" />
          </svg>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 11, letterSpacing: "-0.22px", color: T.brand }}>심쿵배송</span>
        </div>
      </div>
    </div>
  );
}

// ── SelectedProductChip ─────────────────────────────────────────
function SelectedProductChip({ product, onRemove }: { product: typeof PRODUCTS[0]; onRemove: () => void }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 0,
      backgroundColor: T.white, border: `1px solid ${T.border}`,
      borderRadius: 6, height: 40, padding: "0 4px", flexShrink: 0, width: 210,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "0 4px", minWidth: 0 }}>
        <BrandLogo color={product.brandColor} size={24} />
        <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, letterSpacing: "-0.26px", color: T.primary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
          {product.name}
        </span>
      </div>
      <button onClick={onRemove} style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", flexShrink: 0 }}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke={T.tertiary} strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

// ── BottomBar ───────────────────────────────────────────────────
function BottomBar({ selectedIds, products, onRemove, ctaEnabled, scrolled }: {
  selectedIds: Set<number>;
  products: typeof PRODUCTS;
  onRemove: (id: number) => void;
  ctaEnabled: boolean;
  scrolled: boolean;
}) {
  const selectedProducts = products.filter(p => selectedIds.has(p.id));

  return (
    <div style={{
      flexShrink: 0, backgroundColor: T.white,
      boxShadow: scrolled && selectedProducts.length > 0 ? "0 -4px 16px rgba(0,0,0,0.1)" : "none",
      transition: "box-shadow .2s",
    }}>
      {/* 선택 상품 바 */}
      {selectedProducts.length > 0 && (
        <div style={{ height: 56, display: "flex", alignItems: "center", borderTop: `1px solid ${T.border}`, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px", scrollbarWidth: "none" }}>
            {selectedProducts.map(p => (
              <SelectedProductChip key={p.id} product={p} onRemove={() => onRemove(p.id)} />
            ))}
          </div>
        </div>
      )}

      {/* CTA 버튼 */}
      <div style={{ padding: "10px 16px" }}>
        <button style={{
          width: "100%", height: 48, borderRadius: 6, border: "none",
          cursor: ctaEnabled ? "pointer" : "default",
          backgroundColor: ctaEnabled ? T.brand : T.bgLight,
          fontFamily: FONT, fontWeight: 700, fontSize: 14,
          letterSpacing: "-0.28px", color: ctaEnabled ? T.white : T.hint,
          transition: "all .2s",
        }}>
          다음
        </button>
      </div>

      {/* iOS 홈 인디케이터 */}
      <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 134, height: 5, borderRadius: 100, backgroundColor: "#000", opacity: 0.18 }} />
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function PrescriptionPage() {
  const [name,   setName]   = useState("");
  const [phone,  setPhone]  = useState("");
  const [search, setSearch] = useState("");
  const [selectedBrand,    setSelectedBrand]    = useState<string | null>(null);
  const [selectedPetType,  setSelectedPetType]  = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [scrolled, setScrolled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) setScrolled(scrollRef.current.scrollTop > 0);
  }, []);

  const toggleProduct = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const removeProduct = (id: number) => {
    setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
  };

  const ctaEnabled = name.trim() !== "" && phone.trim() !== "" && selectedIds.size > 0;

  const filteredProducts = PRODUCTS.filter(p => {
    if (search && !p.name.includes(search)) return false;
    return true;
  });

  return (
    <div style={{ width: 375, height: 812, backgroundColor: T.white, fontFamily: FONT, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* 고정 헤더 */}
      <StatusBar />
      <AppBar scrolled={scrolled} />

      {/* 스크롤 콘텐츠 */}
      <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>

        {/* 보호자 정보 */}
        <section style={{ padding: "20px 16px 0" }}>
          <p style={{ margin: "0 0 12px", fontFamily: FONT, fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: T.primary }}>
            보호자 정보를 입력해주세요
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InputField label="이름" placeholder="이름을 입력해주세요" value={name} onChange={setName} />
            <InputField label="휴대폰 번호" placeholder="휴대폰 번호를 입력해주세요" value={phone} onChange={setPhone} type="tel" />
          </div>
        </section>

        {/* 섹션 구분선 */}
        <div style={{ height: 10, backgroundColor: T.bgLight, margin: "20px 0" }} />

        {/* 처방식 상품 선택 */}
        <section style={{ padding: "0 16px 24px" }}>
          <p style={{ margin: "0 0 16px", fontFamily: FONT, fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: T.primary }}>
            처방식 상품을 선택해 주세요
          </p>

          {/* 검색바 */}
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 6, height: 52, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, marginBottom: 16 }}>
            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" stroke={T.hint} strokeWidth={1.6} strokeLinecap="round">
              <circle cx={10} cy={10} r={7} />
              <path d="M15.5 15.5L19 19" />
            </svg>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="브랜드, 상품명을 검색하세요"
              style={{ flex: 1, border: "none", outline: "none", background: "none", fontFamily: FONT, fontWeight: 500, fontSize: 14, letterSpacing: "-0.28px", color: T.primary }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <circle cx={8} cy={8} r={7} fill={T.border} />
                  <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke={T.secondary} strokeWidth={1.4} strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* 브랜드 필터 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {BRANDS.map(b => (
              <ChoiceChip key={b.id} label={b.label} brandColor={b.color}
                selected={selectedBrand === b.id}
                onClick={() => setSelectedBrand(prev => prev === b.id ? null : b.id)} />
            ))}
          </div>

          {/* 구분선 */}
          <div style={{ height: 1, backgroundColor: T.border, margin: "0 -16px 12px", width: "calc(100% + 32px)" }} />

          {/* 반려동물 종류 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {PET_TYPES.map(type => (
              <ChoiceChip key={type} label={type}
                selected={selectedPetType === type}
                onClick={() => setSelectedPetType(prev => prev === type ? null : type)} />
            ))}
          </div>

          {/* 카테고리 그리드 */}
          <CategoryGrid selected={selectedCategory} onSelect={setSelectedCategory} />

          {/* 상품 목록 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} checked={selectedIds.has(p.id)} onToggle={() => toggleProduct(p.id)} />
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: T.hint, fontSize: 14, fontFamily: FONT }}>
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 하단 고정 영역 */}
      <BottomBar
        selectedIds={selectedIds}
        products={PRODUCTS}
        onRemove={removeProduct}
        ctaEnabled={ctaEnabled}
        scrolled={scrolled}
      />
    </div>
  );
}
