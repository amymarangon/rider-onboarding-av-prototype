import type { ReactNode } from "react";
import "./prism-components.css";

type NavProps = {
  onBack?: () => void;
  helpLabel?: string;
};

export function StatusBar() {
  return (
    <div className="ios-status-bar">
      <span className="ios-status-bar__time">9:41</span>
      <span className="ios-status-bar__icons" aria-hidden>
        ●●●●  Wi‑Fi  ▮▮▮
      </span>
    </div>
  );
}

export function NavBarMobile({ onBack, helpLabel = "Help" }: NavProps) {
  return (
    <div className="nav-bar-mobile">
      <button type="button" className="nav-bar-mobile__icon" onClick={onBack} aria-label="Back">
        ←
      </button>
      <div className="nav-bar-mobile__spacer" />
      <button type="button" className="nav-bar-mobile__help">
        <span className="nav-bar-mobile__help-icon">?</span>
        {helpLabel}
      </button>
    </div>
  );
}

export function DisplayTitle({ children }: { children: ReactNode }) {
  return <h1 className="display-title">{children}</h1>;
}

export function BodyText({ children }: { children: ReactNode }) {
  return <p className="body-text">{children}</p>;
}

export function ListCell({
  label,
  description,
  trailing = "chevron",
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  trailing?: "chevron" | "radio";
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="list-cell-ios" onClick={onClick}>
      {trailing === "radio" ? (
        <span className={`list-cell-ios__radio${selected ? " is-selected" : ""}`} aria-hidden />
      ) : null}
      <span className="list-cell-ios__body">
        <span className="list-cell-ios__label">{label}</span>
        {description ? <span className="list-cell-ios__description">{description}</span> : null}
      </span>
      {trailing === "chevron" ? <span className="list-cell-ios__chevron">›</span> : null}
    </button>
  );
}

export function ListIOS({ children }: { children: ReactNode }) {
  return <div className="list-ios">{children}</div>;
}

export function NumberedStep({ n, text }: { n: number; text: string }) {
  return (
    <div className="numbered-step">
      <span className="numbered-step__badge">{n}</span>
      <span className="numbered-step__text">{text}</span>
    </div>
  );
}

export function ButtonPrimary({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" className="prism-button prism-button--primary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function ButtonTertiary({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className="prism-button prism-button--tertiary" onClick={onClick}>
      {children}
    </button>
  );
}

export function ButtonGroup({ children }: { children: ReactNode }) {
  return <div className="button-group">{children}</div>;
}

export function MapSnippet({ address }: { address: string }) {
  const mapImageUrl = `${import.meta.env.BASE_URL}assets/map-snippet.png`;

  return (
    <div className="map-snippet-wrap">
      <div className="map-snippet">
        <img
          className="map-snippet__image"
          src={mapImageUrl}
          alt="Map showing your verified address location"
        />
      </div>
      <p className="map-snippet__caption">Address from your document: {address}</p>
    </div>
  );
}

export function MobileDevice({
  children,
  footer,
  onBack,
}: {
  children: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className="mobile-device">
      <StatusBar />
      <NavBarMobile onBack={onBack} />
      <div className="mobile-device__scroll">{children}</div>
      {footer ? <div className="mobile-device__footer">{footer}</div> : null}
      <div className="mobile-device__home-indicator" aria-hidden />
    </div>
  );
}

export function InfoBanner({ children }: { children: ReactNode }) {
  return <div className="info-banner">{children}</div>;
}

export function SuccessBanner({ children }: { children: ReactNode }) {
  return <div className="success-banner">{children}</div>;
}

export function WarningBanner({ children }: { children: ReactNode }) {
  return <div className="warning-banner">{children}</div>;
}

export function VehicleRow({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={`vehicle-row${selected ? " is-selected" : ""}`} onClick={onClick}>
      <span className="vehicle-row__icon" aria-hidden>
        {icon}
      </span>
      <span className="vehicle-row__label">{label}</span>
      <span className={`vehicle-row__radio${selected ? " is-selected" : ""}`} aria-hidden />
    </button>
  );
}

export function VehicleList({ children }: { children: ReactNode }) {
  return <div className="vehicle-list">{children}</div>;
}

export function FloatingField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  const filled = value.length > 0;
  return (
    <label className={`floating-field${filled ? " is-filled" : ""}`}>
      <span className="floating-field__label">{label}</span>
      <input
        className="floating-field__input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="checkbox-field">
      <input
        type="checkbox"
        className="checkbox-field__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
}

export function WaitlistIllustration() {
  return (
    <div className="waitlist-illustration" aria-hidden>
      <div className="waitlist-illustration__pin" />
    </div>
  );
}
