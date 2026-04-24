import React, { useState } from "react";

// Figma asset URLs (7일 유효)
const IMG = {
  searchIcon:   "https://www.figma.com/api/mcp/asset/ea1648bb-66fc-49ff-89f0-6e9f0a570942",
  royalCanin:   "https://www.figma.com/api/mcp/asset/8070c31d-f061-43cb-8147-c1480104a9aa",
  hills:        "https://www.figma.com/api/mcp/asset/f741301e-8862-4b29-920a-810f212d4b0f",
  productThumb: "https://www.figma.com/api/mcp/asset/ca681551-eb63-445e-8f35-67a9389f1930",
  starOn:       "https://www.figma.com/api/mcp/asset/71ac7fb7-bba1-45c2-9790-c7e869234c2b",
  starOff:      "https://www.figma.com/api/mcp/asset/63723c9f-977d-4ef2-83a6-56f76828a7b6",
  couponIcon:   "https://www.figma.com/api/mcp/asset/88159983-2caf-43f2-b488-bf8b432cf8f5",
  deliveryBadge:"https://www.figma.com/api/mcp/asset/02c2b74a-5c13-4576-a65d-bed43af3211c",
  deliveryIcon: "https://www.figma.com/api/mcp/asset/72da86e6-0f57-47db-8218-905194d9b4d3",
  battery:      "https://www.figma.com/api/mcp/asset/4bbe1808-d505-4d9e-bcf5-632c39a3953d",
  wifi:         "https://www.figma.com/api/mcp/asset/d4cd5d66-79c4-4421-b0ac-55a19017fd18",
  cellular:     "https://www.figma.com/api/mcp/asset/13c07277-04ad-4f66-ad28-c315a5146a28",
  changeIcon:   "https://www.figma.com/api/mcp/asset/ab88f4eb-379e-4fcc-9336-4b5361b6e2bf",
};

const BRANDS = [
  { id: "royal", label: "로얄캐닌", logo: IMG.royalCanin },
  { id: "hills",  label: "힐스",    logo: IMG.hills },
];

const PET_TYPES = ["강아지", "고양이"];

const CATEGORIES = [
  "요로기계", "신장계",  "소화기계",
  "피부/알러지", "간/심장", "관절",
  "신경계",  "체중/당뇨", "회복/기타",
];

const PRODUCTS = [
  { id: 1, name: "로얄캐닌 캣 하이포알러제닉 2.5kg", discount: 10, price: "44,700", originalPrice: "49,700원", coupon: "5,000원 쿠폰 적용됨", rating: 4, reviewCount: 213 },
  { id: 2, name: "로얄캐닌 캣 하이포알러제닉 2.5kg", discount: 10, price: "44,700", originalPrice: "49,700원", coupon: "5,000원 쿠폰 적용됨", rating: 4, reviewCount: 213 },
  { id: 3, name: "로얄캐닌 캣 하이포알러제닉 2.5kg", discount: 10, price: "44,700", originalPrice: "49,700원", coupon: "5,000원 쿠폰 적용됨", rating: 4, reviewCount: 213 },
];

// ─── 서브 컴포넌트 ────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{ height: 44, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 21px" }}>
      <span style={{ fontFamily: "'SF Pro Text', sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.33px", color: "#000" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <img src={IMG.cellular} alt="" style={{ height: 12 }} />
        <img src={IMG.wifi}     alt="" style={{ height: 15 }} />
        <img src={IMG.battery}  alt="" style={{ height: 12 }} />
      </div>
    </div>
  );
}

function AppBar({ onBack }: { onBack?: () => void }) {
  return (
    <div style={{ height: 52, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
      <button onClick={onBack} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "none", cursor: "pointer", padding: 8 }}>
        {/* 뒤로가기 아이콘 */}
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#2d3035" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.changeIcon} alt="새로고침" style={{ width: 24, height: 24 }} />
      </div>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange }: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", letterSpacing: "-0.26px", color: "#9ca1aa" }}>
        {label}
      </span>
      <div style={{ border: "1px solid #e9ebec", borderRadius: 6, display: "flex", alignItems: "center", padding: "8px 8px 8px 16px", gap: 8 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, border: "none", outline: "none", background: "none",
            fontFamily: "'Lific', sans-serif", fontWeight: 500, fontSize: 14,
            letterSpacing: "-0.28px", color: "#2d3035",
          }}
        />
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ height: 10, backgroundColor: "#f1f1f1", margin: "20px -16px" }} />;
}

function ChoiceChip({ label, selected, onClick, logo }: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  logo?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 32, borderRadius: 100, border: `1px solid ${selected ? "#ff4081" : "#e9ebec"}`,
        backgroundColor: selected ? "#fff0f5" : "#fff",
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: logo ? "4px 12px 4px 4px" : "4px 12px",
        cursor: "pointer", whiteSpace: "nowrap",
      }}
    >
      {logo && <img src={logo} alt="" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />}
      <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", color: selected ? "#ff4081" : "#2d3035" }}>
        {label}
      </span>
    </button>
  );
}

function CategoryGrid({ selected, onSelect }: { selected: string; onSelect: (c: string) => void }) {
  return (
    <div style={{ border: "1px solid #e9ebec", borderRadius: 8, overflow: "hidden", marginTop: 4 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {CATEGORIES.map((cat, i) => {
          const isSelected = selected === cat;
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              style={{
                height: 40, border: "none", background: isSelected ? "#fff0f5" : "#fff",
                borderRight:  col < 2 ? "1px solid #e9ebec" : "none",
                borderBottom: row < 2 ? "1px solid #e9ebec" : "none",
                cursor: "pointer",
                fontFamily: "'Lific', sans-serif", fontWeight: 400, fontSize: 14,
                letterSpacing: "-0.28px", color: isSelected ? "#ff4081" : "#757c89",
                textAlign: "center",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 0 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <img key={n} src={n <= rating ? IMG.starOn : IMG.starOff} alt="" style={{ width: 11, height: 11 }} />
      ))}
    </div>
  );
}

function ProductCard({ product, selected, onToggle }: {
  product: typeof PRODUCTS[0];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ border: "1px solid #f1f1f1", borderRadius: 8, padding: 16, display: "flex", gap: 14 }}>
      {/* 체크박스 */}
      <div
        onClick={onToggle}
        style={{
          position: "absolute", width: 20, height: 20,
          border: `2px solid ${selected ? "#ff4081" : "#dbdde0"}`,
          borderRadius: 4, backgroundColor: selected ? "#ff4081" : "#fff",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        {selected && (
          <svg width={12} height={10} viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* 상품 이미지 */}
      <div style={{ width: 100, height: 100, borderRadius: 8, overflow: "hidden", flexShrink: 0, marginLeft: 28 }}>
        <img src={IMG.productThumb} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* 상품 정보 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
        {/* 상품명 */}
        <p style={{ margin: 0, fontFamily: "'Lific', sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "18px", letterSpacing: "-0.26px", color: "#2d3035" }}>
          {product.name}
        </p>

        {/* 쿠폰 적용가 / 원가 */}
        <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "-0.24px", color: "#f33f46" }}>
            쿠폰 적용가
          </span>
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "-0.24px", color: "#9ca1aa", textDecoration: "line-through" }}>
            {product.originalPrice}
          </span>
        </div>

        {/* 할인율 + 가격 */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 2 }}>
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: "#f33f46" }}>
            {product.discount}%
          </span>
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: "#2d3035" }}>
            {product.price}
          </span>
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 400, fontSize: 14, letterSpacing: "-0.28px", color: "#2d3035" }}>
            원
          </span>
        </div>

        {/* 쿠폰 뱃지 */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 2,
          border: "1px solid #ff5d94", borderRadius: 4,
          padding: "2px 6px", marginTop: 4, alignSelf: "flex-start",
        }}>
          <img src={IMG.couponIcon} alt="" style={{ width: 12, height: 12 }} />
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "-0.2px", color: "#ea306f" }}>
            {product.coupon}
          </span>
        </div>

        {/* 별점 */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 4 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontFamily: "'Lific', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "-0.24px", color: "#9ca1aa" }}>
            ({product.reviewCount})
          </span>
        </div>

        {/* 심쿵배송 */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 4 }}>
          <img src={IMG.deliveryIcon} alt="" style={{ width: 16, height: 16 }} />
          <img src={IMG.deliveryBadge} alt="심쿵배송" style={{ height: 12 }} />
        </div>
      </div>
    </div>
  );
}

function BottomCTA({ enabled, onClick }: { enabled: boolean; onClick?: () => void }) {
  return (
    <div style={{ position: "sticky", bottom: 0, backgroundColor: "#fff" }}>
      <div style={{ padding: "10px 16px" }}>
        <button
          onClick={onClick}
          disabled={!enabled}
          style={{
            width: "100%", height: 48, borderRadius: 6, border: "none", cursor: enabled ? "pointer" : "default",
            backgroundColor: enabled ? "#ff4081" : "#f1f1f1",
            fontFamily: "'Lific', sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: "-0.28px", color: enabled ? "#fff" : "#c6c9ce",
          }}
        >
          다음
        </button>
      </div>
      {/* iOS 홈 인디케이터 */}
      <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 134, height: 5, borderRadius: 100, backgroundColor: "#000" }} />
      </div>
    </div>
  );
}

// ─── 메인 페이지 ─────────────────────────────────────────────────

export default function HospitalConsultationPage() {
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [search, setSearch]         = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const canProceed = name.trim() !== "" && phone.trim() !== "" && selectedProducts.size > 0;

  return (
    <div style={{ width: 375, minHeight: 812, backgroundColor: "#fff", fontFamily: "'Lific', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* 상태바 */}
      <StatusBar />

      {/* 앱바 */}
      <AppBar />

      {/* 스크롤 콘텐츠 */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 0" }}>

        {/* 보호자 정보 섹션 */}
        <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, fontFamily: "'Lific', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: "#2d3035" }}>
            보호자 정보를 입력해주세요
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InputField label="이름" placeholder="이름을 입력해주세요" value={name} onChange={setName} />
            <InputField label="휴대폰 번호" placeholder="휴대폰 번호를 입력해주세요" value={phone} onChange={setPhone} />
          </div>
        </div>

        <SectionDivider />

        {/* 처방식 상품 선택 섹션 */}
        <div style={{ paddingBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, fontFamily: "'Lific', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.32px", color: "#2d3035" }}>
            처방식 상품을 선택해 주세요
          </p>

          {/* 검색바 */}
          <div style={{ border: "1px solid #e9ebec", borderRadius: 6, height: 52, display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
            <img src={IMG.searchIcon} alt="" style={{ width: 24, height: 24 }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="브랜드, 상품명을 검색하세요"
              style={{
                flex: 1, border: "none", outline: "none", background: "none",
                fontFamily: "'Lific', sans-serif", fontWeight: 500, fontSize: 14,
                letterSpacing: "-0.28px", color: "#2d3035",
              }}
            />
          </div>

          {/* 브랜드 필터 */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {BRANDS.map((b) => (
              <ChoiceChip
                key={b.id}
                label={b.label}
                logo={b.logo}
                selected={selectedBrand === b.id}
                onClick={() => setSelectedBrand(selectedBrand === b.id ? null : b.id)}
              />
            ))}
          </div>

          {/* 구분선 */}
          <div style={{ height: 1, backgroundColor: "#e9ebec", margin: "0 -16px", width: "calc(100% + 32px)" }} />

          {/* 반려동물 종류 필터 */}
          <div style={{ display: "flex", gap: 8 }}>
            {PET_TYPES.map((type) => (
              <ChoiceChip
                key={type}
                label={type}
                selected={selectedPetType === type}
                onClick={() => setSelectedPetType(selectedPetType === type ? null : type)}
              />
            ))}
          </div>

          {/* 카테고리 그리드 */}
          <CategoryGrid selected={selectedCategory} onSelect={setSelectedCategory} />

          {/* 상품 카드 목록 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, position: "relative" }}>
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedProducts.has(product.id)}
                onToggle={() => toggleProduct(product.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 CTA */}
      <BottomCTA enabled={canProceed} />
    </div>
  );
}
