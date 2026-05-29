export type ScreenId =
  | "doc_select"
  | "doc_upload"
  | "processing"
  | "eligible_areas"
  | "vehicle_selection"
  | "personal_details"
  | "waitlist";

export type AreaStatus = "open" | "limited" | "waitlist";

export type DocOption = { id: string; label: string };

export type EligibleArea = {
  id: string;
  name: string;
  distanceKm: number;
  status: AreaStatus;
};

export type VehicleOption = {
  id: string;
  label: string;
  icon: string;
};

export const FLOW_STEPS: { id: ScreenId; label: string }[] = [
  { id: "personal_details", label: "Your details" },
  { id: "doc_select", label: "Select document type" },
  { id: "doc_upload", label: "Upload document" },
  { id: "processing", label: "Extract address" },
  { id: "eligible_areas", label: "Choose eligible area" },
  { id: "vehicle_selection", label: "Vehicle type" },
  { id: "waitlist", label: "Waitlist" },
];

export const DOC_OPTIONS: DocOption[] = [
  { id: "dl", label: "UK driving license" },
  { id: "utility", label: "Utility bill dated within the last 6 months" },
  {
    id: "bank",
    label: "Credit card or bank statement dated within the last 6 months",
  },
  { id: "payslip", label: "Payslip dated within the last 6 months" },
];

export const ELIGIBLE_AREAS: EligibleArea[] = [
  { id: "camden", name: "Camden", distanceKm: 0.8, status: "open" },
  { id: "islington", name: "Islington", distanceKm: 1.2, status: "open" },
  { id: "westminster", name: "Westminster", distanceKm: 2.1, status: "limited" },
  { id: "hackney", name: "Hackney", distanceKm: 3.4, status: "waitlist" },
  { id: "brixton", name: "Brixton", distanceKm: 4.6, status: "open" },
];

export const EXTRACTED_ADDRESS = "14 Example Street, London SW1A 1AA";

export const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: "car", label: "Car or van", icon: "C" },
  { id: "bicycle", label: "Bicycle", icon: "B" },
  { id: "ebike", label: "Electric bicycle", icon: "E" },
  { id: "moped", label: "Scooter or motorcycle", icon: "M" },
  { id: "walk", label: "Deliver by walking", icon: "W" },
];

export function docLabel(docId: string): string {
  return DOC_OPTIONS.find((d) => d.id === docId)?.label ?? "Proof of address document";
}

export function areaStatusLabel(status: AreaStatus): string {
  if (status === "open") return "Open for applications";
  if (status === "limited") return "Limited availability";
  return "Join waitlist";
}

export function vehicleLabel(vehicleId: string): string {
  return VEHICLE_OPTIONS.find((v) => v.id === vehicleId)?.label ?? "Vehicle";
}