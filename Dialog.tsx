import React from "react";

type DialogProps = {
  title?: string;
  description?: string;
  action1Label?: string;
  action2Label?: string;
  onAction1?: () => void;
  onAction2?: () => void;
  className?: string;
};

export function Dialog({
  title = "다이얼로그 헤더가 보여요",
  description = "다이얼로그 바디 텍스트가 보여요 다이얼로그 바디 텍스트가 보여요",
  action1Label = "Action 1",
  action2Label = "Action 2",
  onAction1,
  onAction2,
  className,
}: DialogProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 295 }}
      className={className}
    >
      {/* Header + Body */}
      <div
        style={{
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 10px",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: 295,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textAlign: "center",
            width: 247,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'Lific', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: "-0.32px",
              color: "#2d3035",
              lineHeight: "normal",
            }}
          >
            {title}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Lific', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              letterSpacing: "-0.28px",
              color: "#757c89",
              lineHeight: "normal",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          width: "100%",
        }}
      >
        {/* Horizontal divider */}
        <div style={{ height: 1, backgroundColor: "#e9ebec", width: 295 }} />

        {/* Action buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            onClick={onAction1}
            style={{
              width: 147,
              height: 48,
              padding: 10,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontFamily: "'Lific', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              letterSpacing: "-0.28px",
              color: "#2d3035",
              textAlign: "center",
              fontStyle: "normal",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
            }}
          >
            {action1Label}
          </button>

          {/* Vertical divider */}
          <div
            style={{
              width: 1,
              height: 48,
              backgroundColor: "#e9ebec",
              flexShrink: 0,
            }}
          />

          <button
            onClick={onAction2}
            style={{
              width: 147,
              height: 48,
              padding: 10,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontFamily: "'Lific', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "-0.28px",
              color: "#2d3035",
              textAlign: "center",
              fontStyle: "normal",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
            }}
          >
            {action2Label}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
