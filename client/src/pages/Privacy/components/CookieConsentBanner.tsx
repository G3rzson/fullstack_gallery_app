import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import "./cookieConsentBanner.css";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Elfogadom"
      declineButtonText="Elutasítom"
      enableDeclineButton
      cookieName="gallery_cookie_consent"
      style={{
        background: "var(--bg-dropdown)",
        borderTop: "1px solid var(--border)",
        boxSizing: "border-box",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
      containerClasses="cookie-consent-container"
      contentClasses="cookie-consent-content"
      buttonWrapperClasses="cookie-consent-buttons"
      buttonStyle={{
        fontSize: "14px",
        borderRadius: "6px",
        padding: "8px 16px",
        backgroundColor: "var(--success-bg)",
        border: "1px solid var(--success-border)",
        color: "var(--success-text)",
      }}
      declineButtonStyle={{
        fontSize: "14px",
        borderRadius: "6px",
        padding: "8px 16px",
        backgroundColor: "var(--error-bg)",
        border: "1px solid var(--error-border)",
        color: "var(--error-text)",
      }}
      expires={1} // Cookie expires in 1 day
    >
      <span
        style={{
          fontSize: "14px",
          color: "var(--text-primary)",
          textWrap: "wrap",
        }}
      >
        Ez az oldal sütiket használ a jobb felhasználói élmény érdekében.{" "}
        <Link to="/privacy">További információ</Link>
      </span>
    </CookieConsent>
  );
}
