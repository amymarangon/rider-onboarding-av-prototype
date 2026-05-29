import { useMemo, useState } from "react";
import {
  BodyText,
  ButtonGroup,
  ButtonPrimary,
  ButtonTertiary,
  CheckboxField,
  DisplayTitle,
  FloatingField,
  InfoBanner,
  ListCell,
  ListIOS,
  MapSnippet,
  MobileDevice,
  NumberedStep,
  VehicleList,
  VehicleRow,
  WaitlistIllustration,
} from "./components/prism-components";
import {
  DOC_OPTIONS,
  ELIGIBLE_AREAS,
  EXTRACTED_ADDRESS,
  FLOW_STEPS,
  VEHICLE_OPTIONS,
  areaStatusLabel,
  docLabel,
  type ScreenId,
} from "./flow/types";

function stepIndex(id: ScreenId) {
  return FLOW_STEPS.findIndex((s) => s.id === id);
}

export default function App() {
  const [screen, setScreen] = useState<ScreenId>("personal_details");
  const [docType, setDocType] = useState("utility");
  const [selectedArea, setSelectedArea] = useState("camden");
  const [selectedVehicle, setSelectedVehicle] = useState("bicycle");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hasReferral, setHasReferral] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const sortedAreas = useMemo(
    () => [...ELIGIBLE_AREAS].sort((a, b) => a.distanceKm - b.distanceKm),
    [],
  );

  const selected = sortedAreas.find((a) => a.id === selectedArea) ?? sortedAreas[0];

  const goBack = () => {
    if (screen === "waitlist") {
      setScreen("eligible_areas");
      return;
    }
    const idx = stepIndex(screen);
    if (idx > 0) setScreen(FLOW_STEPS[idx - 1].id);
  };

  const canContinuePersonalDetails =
    firstName.trim().length > 0 && lastName.trim().length > 0 && email.trim().length > 0;

  const renderScreen = () => {
    switch (screen) {
      case "doc_select":
        return (
          <MobileDevice onBack={goBack}>
            <DisplayTitle>Select your proof of address document</DisplayTitle>
            <BodyText>
              Make sure it shows your full name and home address so we can verify your
              details.
            </BodyText>
            <ListIOS>
              {DOC_OPTIONS.map((opt) => (
                <ListCell
                  key={opt.id}
                  label={opt.label}
                  onClick={() => {
                    setDocType(opt.id);
                    setScreen("doc_upload");
                  }}
                />
              ))}
            </ListIOS>
            <div className="see-more-wrap">
              <ButtonTertiary onClick={() => undefined}>See more options</ButtonTertiary>
            </div>
          </MobileDevice>
        );

      case "doc_upload":
        return (
          <MobileDevice
            onBack={goBack}
            footer={
              <ButtonGroup>
                <ButtonPrimary onClick={() => setScreen("processing")}>Take photo</ButtonPrimary>
                <ButtonTertiary onClick={() => setScreen("processing")}>Upload file</ButtonTertiary>
              </ButtonGroup>
            }
          >
            <DisplayTitle>Upload {docLabel(docType).toLowerCase()}</DisplayTitle>
            <NumberedStep n={1} text="Photo is clear with all details visible" />
            <NumberedStep n={2} text="File size is not larger than 15MB" />
          </MobileDevice>
        );

      case "processing":
        return (
          <MobileDevice
            onBack={goBack}
            footer={
              <ButtonGroup>
                <ButtonPrimary onClick={() => setScreen("eligible_areas")}>
                  Continue to area selection
                </ButtonPrimary>
                <ButtonTertiary onClick={() => setScreen("doc_select")}>
                  Upload another document
                </ButtonTertiary>
              </ButtonGroup>
            }
          >
            <DisplayTitle>Checking your document</DisplayTitle>
            <BodyText>
              We are reading your home address from your document. This usually takes a few
              seconds.
            </BodyText>
            <InfoBanner>Extracted address: {EXTRACTED_ADDRESS}</InfoBanner>
          </MobileDevice>
        );

      case "eligible_areas":
        return (
          <MobileDevice
            onBack={goBack}
            footer={
              <ButtonGroup>
                <ButtonPrimary
                  onClick={() =>
                    setScreen(selected.status === "waitlist" ? "waitlist" : "vehicle_selection")
                  }
                >
                  Continue
                </ButtonPrimary>
              </ButtonGroup>
            }
          >
            <MapSnippet address={EXTRACTED_ADDRESS} />
            <DisplayTitle>Choose where you will ride</DisplayTitle>
            <BodyText>These areas are open for new riders near you</BodyText>
            <p className="constraint-label">You must work in the city you select</p>
            <ListIOS>
              {sortedAreas.map((area) => (
                <ListCell
                  key={area.id}
                  label={area.name}
                  description={`${area.distanceKm} km from your address · ${areaStatusLabel(area.status)}`}
                  trailing="radio"
                  selected={selectedArea === area.id}
                  onClick={() => setSelectedArea(area.id)}
                />
              ))}
              <ListCell
                label="None of these — re-try with another document"
                onClick={() => setScreen("doc_select")}
              />
            </ListIOS>
          </MobileDevice>
        );

      case "vehicle_selection":
        return (
          <MobileDevice
            onBack={goBack}
            footer={
              <ButtonGroup>
                <ButtonPrimary>Continue</ButtonPrimary>
              </ButtonGroup>
            }
          >
            <DisplayTitle>How will you get around?</DisplayTitle>
            <BodyText>
              You will need to provide the relevant documentation for your vehicle as part of
              your application.
            </BodyText>
            <VehicleList>
              {VEHICLE_OPTIONS.map((vehicle) => (
                <VehicleRow
                  key={vehicle.id}
                  icon={vehicle.icon}
                  label={vehicle.label}
                  selected={selectedVehicle === vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                />
              ))}
            </VehicleList>
            <div className="form-stack form-stack--vehicle">
              <CheckboxField
                label="I have a referral code"
                checked={hasReferral}
                onChange={(checked) => {
                  setHasReferral(checked);
                  if (!checked) setReferralCode("");
                }}
              />
              {hasReferral ? (
                <FloatingField
                  label="Referral code"
                  value={referralCode}
                  onChange={setReferralCode}
                />
              ) : null}
            </div>
          </MobileDevice>
        );

      case "personal_details":
        return (
          <MobileDevice
            onBack={goBack}
            footer={
              <ButtonGroup>
                <ButtonPrimary
                  disabled={!canContinuePersonalDetails}
                  onClick={() => setScreen("doc_select")}
                >
                  Continue
                </ButtonPrimary>
              </ButtonGroup>
            }
          >
            <DisplayTitle>Let&apos;s get you delivering!</DisplayTitle>
            <BodyText>
              We need these details to build your application. Make sure they match the government
              ID you&apos;ll use in your application.
            </BodyText>
            <div className="form-stack">
              <FloatingField label="First name" value={firstName} onChange={setFirstName} />
              <FloatingField label="Last name" value={lastName} onChange={setLastName} />
              <FloatingField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="name@email.com"
              />
            </div>
          </MobileDevice>
        );

      case "waitlist":
        return (
          <MobileDevice
            onBack={goBack}
            footer={
              <ButtonGroup>
                <ButtonPrimary>Notify me</ButtonPrimary>
                <ButtonTertiary onClick={() => setScreen("eligible_areas")}>
                  Choose another area
                </ButtonTertiary>
              </ButtonGroup>
            }
          >
            <div className="waitlist-screen">
              <WaitlistIllustration />
              <h2 className="waitlist-title">Limited availability in this area</h2>
              <BodyText>
                Your area isn&apos;t open for new applications. We can notify you when new riders
                are needed, but this might not change soon.
              </BodyText>
              <ul className="waitlist-bullets">
                <li>We&apos;ll email you when applications reopen in {selected.name}</li>
                <li>You can choose a nearby open area to apply now instead</li>
              </ul>
            </div>
          </MobileDevice>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <h2>Address verification</h2>
        <p>
          Figma-matched prototype (393×852). Tokens from Onboarding — Wolt — Dx — Roo audit.
        </p>
        {(["Your details", "Address verification", "Areas & vehicle", "Waitlist"] as const).map(
          (phase, i) => (
          <div key={phase}>
            <div className="phase-label">{phase}</div>
            {FLOW_STEPS.filter((_, idx) =>
              i === 0
                ? idx === 0
                : i === 1
                  ? idx >= 1 && idx < 4
                  : i === 2
                    ? idx >= 4 && idx < 6
                    : idx === 6,
            ).map((step) => (
              <button
                key={step.id}
                type="button"
                className={screen === step.id ? "is-active" : ""}
                onClick={() => setScreen(step.id)}
              >
                {step.label}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <div>
        <div className="app-preview-label">Mobile preview</div>
        {renderScreen()}
      </div>
    </div>
  );
}
