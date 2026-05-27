import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function CookieConsentBanner() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  const darkColor = "oklch(20% 0.109 3.907)";
  const lightColor = "oklch(80% 0.061 343.231)";

  return (
    <CookieConsent
      key={theme}
      location="bottom"
      buttonText="Elfogadom"
      buttonClasses="cookie-accept-btn"
      declineButtonText="Elutasítom"
      declineButtonClasses="cookie-decline-btn"
      enableDeclineButton
      cookieName="gallery_cookie_consent"
      expires={1}
      // main container styles
      style={{
        margin: 0,
        backgroundColor: isLight ? lightColor : darkColor,
        borderTop: `1px solid ${isLight ? darkColor : lightColor}`,
        color: isLight ? darkColor : lightColor,
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
      // content container styles
      contentStyle={{
        fontSize: "0.875rem",
        margin: 0,
      }}
    >
      <span
        style={{
          fontSize: "0.875rem",
          color: isLight ? darkColor : lightColor,
        }}
      >
        Ez az oldal sütiket használ a jobb felhasználói élmény érdekében.{" "}
        <Link
          to="/privacy"
          style={{
            textDecoration: "underline",
            opacity: 1,
            color: isLight ? "#7c3aed" : "#a5b4fc", // light: violet-600, dark: indigo-200
            transition: "opacity 0.2s, color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.8";
            e.currentTarget.style.color = isLight ? "#6d28d9" : "#818cf8"; // hover: violet-700, dark: indigo-300
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.color = isLight ? "#7c3aed" : "#a5b4fc";
          }}
        >
          További információ
        </Link>
      </span>
    </CookieConsent>
  );
}
