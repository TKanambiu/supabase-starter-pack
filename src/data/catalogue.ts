export type Product = {
  name: string;
  /** Retail price in KES */
  price: number;
  /** Reseller / trade price in KES */
  reseller?: number;
  /** Optional product photo (place file in /public and set path here) */
  image?: string;
};

export type Subcategory = { name: string; products: Product[] };

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
};

const IMG: Record<string, string> = {
  "ppe-protective-wear": "/cat-ppe.jpg",
  "wound-care-dressings": "/cat-wound.jpg",
  "laboratory-diagnostics": "/cat-lab.jpg",
  "monitoring-homecare": "/cat-monitor.jpg",
  "respiratory-oxygen": "/cat-oxygen.jpg",
  "neonatal-maternity": "/cat-neonatal.jpg",
  "hospital-furniture": "/cat-furniture.jpg",
  "theater-emergency": "/cat-theater.jpg",
  "imaging-radiology": "/cat-imaging.jpg",
  "ophthalmic-eye-care": "/hero2.webp",
};

/** Product photos live in /public — matched to products by normalised name. */
const PRODUCT_FILES: string[] = [
  "10L_Bedside_Oxygen_Concentrator.png",
  "2_Crank_ABS_Hospital_Bed.png",
  "3M_N95_1860.png",
  "3M_N95_8210.png",
  "3_Ball_Incentive_Spirometer.png",
  "3_Fold_Ward_Screen.png",
  "3_Ply_Surgical_Face_Masks_Box_of_50.png",
  "3_Shelf_Medicine_Trolley.png",
  "4_Fold_Ward_Screen.png",
  "5L_Portable_Oxygen_Concentrator.png",
  "7L_Portable_Oxygen_Concentrator.png",
  "Adult_Diapers.png",
  "Ambu_Bag.png",
  "Baby_Finger_Oximeter.png",
  "Baby_Incubator.png",
  "Baby_Warmer_with_Phototherapy.png",
  "Beard_Cover_Pack_of_100.png",
  "Bedside_Cabinet.png",
  "Cordless_Tunnel_BP_Machine.png",
  "Coverall_with_Shoe_Cover.png",
  "DP_20_Mindray_Ultrasound.png",
  "Diagnostic_Kit.png",
  "Diathermy_Machine_400W.png",
  "Digital_Baby_Scale.png",
  "Digital_Height_Weight_Scale.png",
  "Digital_Thermometer.png",
  "Disposable_Apron.png",
  "Electronic_Lab_Centrifuge_4000RPM.png",
  "Emergency_Trolley_Crash_Cart.png",
  "Extra_Large_BP_Cuff.png",
  "Face_Shield.png",
  "Fetal_Doppler.png",
  "First_Aid_Box.png",
  "Fogging_Machine.png",
  "Freestyle_Libre_2_CGM.png",
  "Fridge_Thermometer.png",
  "Gauze_Roll_1500gms.png",
  "Generic_BP_Machine.png",
  "Gypsona_POP_4in.png",
  "Gypsona_POP_6in.png",
  "Gypsona_POP_8in.png",
  "Hairnet_Head_Cap.png",
  "Handheld_Oximeter.png",
  "Hematology_Analyzer_DH31_with_Reagents.png",
  "Hemocue_301_Machine.png",
  "Hemocue_Microcuvettes.png",
  "Humidifier_Bottle.png",
  "Infrared_Thermometer.png",
  "KN95_Mask_With_Valve.png",
  "KN95_Mask_Without_Valve.png",
  "LED_Adjustable_Examination_Lamp.png",
  "Lab_Incubator.png",
  "Latex_Powder_Free_Gloves.png",
  "Latex_Powdered_Gloves.png",
  "MUAC_Tape.png",
  "Medical_Crocs_Clogs.png",
  "Medical_Gumboots.png",
  "Medicine_Trolley.png",
  "Microscope_X701.png",
  "Multi_use_Biohazard_Spill_Kit.png",
  "Nebulizer_Compressor.png",
  "Nitrile_Gloves.png",
  "Nurse_Watch.png",
  "Olympus_Microscope_CX23.png",
  "Omnipaque_Contrast_Medium.png",
  "Omron_M1_BP_Machine.png",
  "Omron_M2_BP_Machine.png",
  "On_Call_Glucometer.png",
  "On_Call_Strips.png",
  "Orthopedic_Padding_6in.png",
  "Orthopedic_Padding_8in.png",
  "Oxygen_Cylinder_1.36m3.png",
  "Oxygen_Cylinder_3.4m3.png",
  "Oxygen_Cylinder_7.0m3.png",
  "Oxygen_Cylinder_8.5m3.png",
  "Oxygen_Mask.png",
  "Oxygen_Regulator.png",
  "Pill_Organizer.png",
  "Plaster_Cutter.png",
  "Ripple_Mattress.png",
  "Safety_Boots.png",
  "Safety_Goggles.png",
  "Sanitary_Bin.png",
  "Sibionic_Continuous_Glucose_Monitor.png",
  "Single_X_Ray_Viewer.png",
  "Sterile_Gloves.png",
  "Stool_Container.png",
  "Temperature_Hygrometer.png",
  "Tourniquet.png",
  "UPP_110HG_X_Ray_Thermal_Paper.png",
  "Ultrasound_Gel.png",
  "VINNO_A3_Color_Doppler_Ultrasound.png",
  "Vacutainer_Tubes_Red_Yellow_Purple.png",
  "Vein_Finder.png",
  "White_Body_Bag_220x90.png",
  "Yuwell_Rechargeable_BP_Machine.png",
  "pH_Meter_Pen_Type.png",
  "5ML DISPOSABLE SYRINGE.jpg",
  "ABSORBETN GAUZE (750G).jpg",
  "BLOOD GIVING SET.jpg",
  "BLUE Nitrile-1 EXAMINATION.jpg",
  "Cotton-WooL 400 G.png",
  "KY-JELLY-.jpg",
  "Surgical-Spirit-70-5L-front-view-1-scaled.jpg",
  "iv-cannula-branula.png",
];

export const normKey = (s: string) =>
  s
    .replace(/\u00B3/g, "3")
    .replace(/"/g, "in")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const PRODUCT_IMG: Record<string, string> = Object.fromEntries(
  PRODUCT_FILES.map((f) => [normKey(f.replace(/\.(png|jpe?g|webp)$/i, "")), `/${f}`]),
);

const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  [normKey("Branula (Pink) IV Cannula")]: "/iv-cannula-branula.png",
  [normKey("Surgical Spirit (5 Liters)")]: "/Surgical-Spirit-70-5L-front-view-1-scaled.jpg",
  [normKey("Nitrile Examination Gloves")]: "/BLUE Nitrile-1 EXAMINATION.jpg",
  [normKey("Absorbent Gauze (750 g)")]: "/ABSORBETN GAUZE (750G).jpg",
  [normKey("KY Lubricating Jelly")]: "/KY-JELLY-.jpg",
};

const productImage = (name: string) =>
  PRODUCT_IMAGE_OVERRIDES[normKey(name)] ?? PRODUCT_IMG[normKey(name)];


const p = (name: string, reseller: number, price: number): Product => ({
  name,
  reseller,
  price,
  image: productImage(name),
});

const RAW_CATEGORIES: Omit<Category, "image">[] = [
  {
    slug: "ppe-protective-wear",
    name: "PPE & Protective Wear",
    tagline: "Certified protection for every clinical setting.",
    description:
      "Complete personal protective equipment for hospitals, laboratories and field response teams.",
    subcategories: [
      {
        name: "Masks & Respirators",
        products: [
          p("3 Ply Surgical Face Masks (Box of 50)", 180, 220),
          p("KN95 Mask With Valve", 28, 35),
          p("KN95 Mask Without Valve", 15, 20),
          p("3M N95 8210", 110, 120),
          p("3M N95 1860", 110, 120),
        ],
      },
      {
        name: "Protective Wear",
        products: [
          p("Coverall with Shoe Cover", 400, 600),
          p("Disposable Apron", 1100, 1350),
          p("Beard Cover (Pack of 100)", 800, 1000),
          p("Hairnet / Head Cap", 350, 350),
          p("Face Shield", 100, 150),
          p("Safety Goggles", 200, 200),
        ],
      },
      {
        name: "Gloves & Footwear",
        products: [
          p("Latex Powdered Gloves", 320, 350),
          p("Latex Powder Free Gloves", 400, 450),
          p("Nitrile Gloves", 350, 380),
          p("Nitrile Examination Gloves", 390, 420),
          p("Sterile Gloves", 950, 1050),
          p("Medical Gumboots", 700, 850),
          p("Safety Boots", 2400, 2800),
          p("Medical Crocs / Clogs", 1500, 1800),
          p("Nurse Watch", 500, 500),
        ],
      },
    ],
  },
  {
    slug: "wound-care-dressings",
    name: "Wound Care & Dressings",
    tagline: "Dressings, casting and orthopedic support supplies.",
    description:
      "Trusted wound-care consumables and orthopedic casting materials for hospitals and clinics.",
    subcategories: [
      {
        name: "Dressings",
        products: [
          p("Gauze Roll 1500gms", 1200, 1200),
          p("Absorbent Gauze (750 g)", 600, 650),
          p("Cotton Wool (400 g)", 190, 220),
        ],
      },
      {
        name: "Consumables & Disposables",
        products: [
          p("Branula (Pink) IV Cannula", 60, 70),
          p("Blood Giving Set", 15, 20),
          p("5 mL Disposable Syringe", 580, 650),
          p("Surgical Spirit (5 Liters)", 780, 850),
          p("KY Lubricating Jelly", 780, 850),
        ],
      },
      {
        name: "Gypsona POP Bandages",
        products: [
          p('Gypsona POP 4"', 350, 350),
          p('Gypsona POP 6"', 380, 380),
          p('Gypsona POP 8"', 450, 450),
        ],
      },
      {
        name: "Orthopedic Support",
        products: [
          p('Orthopedic Padding 6"', 55, 55),
          p('Orthopedic Padding 8"', 75, 75),
          p("Plaster Cutter", 28000, 28000),
          p("Tourniquet", 200, 250),
        ],
      },
    ],
  },
  {
    slug: "laboratory-diagnostics",
    name: "Laboratory & Diagnostics",
    tagline: "Precision instruments for accurate results.",
    description:
      "Core laboratory equipment, screening and calibration tools for reliable diagnostics.",
    subcategories: [
      {
        name: "Core Lab Equipment",
        products: [
          p("Microscope X701", 22500, 22500),
          p("Olympus Microscope CX23", 165000, 165000),
          p("Lab Incubator", 32000, 32000),
          p("Electronic Lab Centrifuge 4000RPM", 7500, 7500),
          p("Hematology Analyzer DH31 with Reagents", 365000, 365000),
        ],
      },
      {
        name: "Diagnostics & Screening",
        products: [
          p("Hemocue 301 Machine", 75000, 75000),
          p("Hemocue Microcuvettes", 3500, 3500),
          p("Diagnostic Kit", 8500, 9500),
          p("Vein Finder", 6000, 7500),
          p("MUAC Tape", 150, 150),
        ],
      },
      {
        name: "Monitoring & Consumables",
        products: [
          p("pH Meter (Pen Type)", 2500, 3500),
          p("Fridge Thermometer", 650, 650),
          p("Temperature Hygrometer", 1000, 1000),
          p("Vacutainer Tubes (Red / Yellow / Purple)", 550, 550),
          p("Stool Container", 13, 13),
        ],
      },
    ],
  },
  {
    slug: "monitoring-homecare",
    name: "Monitoring & Homecare",
    tagline: "Reliable monitoring for home and clinic.",
    description:
      "Blood-pressure monitors, glucometers, thermometers and daily-living aids for patient care at home.",
    subcategories: [
      {
        name: "Blood Pressure",
        products: [
          p("Generic BP Machine", 850, 1300),
          p("Omron M1 BP Machine", 4500, 4500),
          p("Omron M2 BP Machine", 6500, 6500),
          p("Yuwell Rechargeable BP Machine", 2500, 3000),
          p("Cordless Tunnel BP Machine", 8500, 10500),
          p("Extra Large BP Cuff", 1000, 1200),
        ],
      },
      {
        name: "Vitals & Screening",
        products: [
          p("Infrared Thermometer", 800, 1000),
          p("Digital Thermometer", 150, 150),
          p("Handheld Oximeter", 8500, 10000),
          p("Baby Finger Oximeter", 600, 900),
          p("On Call Glucometer", 1000, 1300),
          p("On Call Strips", 650, 700),
        ],
      },
      {
        name: "Continuous Care",
        products: [
          p("Freestyle Libre 2 CGM", 20000, 20000),
          p("Sibionic Continuous Glucose Monitor", 9999, 9999),
          p("Adult Diapers", 580, 580),
          p("Pill Organizer", 500, 500),
          p("Digital Height & Weight Scale", 13000, 14500),
        ],
      },
    ],
  },
  {
    slug: "respiratory-oxygen",
    name: "Respiratory & Oxygen Therapy",
    tagline: "Breathe easy with complete oxygen solutions.",
    description:
      "From portable concentrators to oxygen cylinders and gas systems for hospitals and clinics.",
    subcategories: [
      {
        name: "Respiratory Care",
        products: [
          p("Nebulizer Compressor", 2500, 3000),
          p("Oxygen Mask", 85, 85),
          p("Humidifier Bottle", 1000, 1200),
          p("Oxygen Regulator", 2500, 3000),
          p("3 Ball Incentive Spirometer", 800, 1200),
          p("Ambu Bag", 4500, 4500),
        ],
      },
      {
        name: "Oxygen Concentrators",
        products: [
          p("5L Portable Oxygen Concentrator", 92000, 98000),
          p("7L Portable Oxygen Concentrator", 78000, 85000),
          p("10L Bedside Oxygen Concentrator", 65000, 65000),
        ],
      },
      {
        name: "Oxygen Cylinders",
        products: [
          p("Oxygen Cylinder 1.36m³", 12500, 12500),
          p("Oxygen Cylinder 3.4m³", 19500, 19500),
          p("Oxygen Cylinder 7.0m³", 25000, 25000),
          p("Oxygen Cylinder 8.5m³", 28000, 28000),
        ],
      },
    ],
  },
  {
    slug: "neonatal-maternity",
    name: "Neonatal & Maternity",
    tagline: "Advanced care for every new beginning.",
    description:
      "Equipment for labour wards, neonatal units and maternity clinics.",
    subcategories: [
      {
        name: "Neonatal Equipment",
        products: [
          p("Fetal Doppler", 2500, 3500),
          p("Digital Baby Scale", 3500, 4000),
          p("Baby Warmer with Phototherapy", 185000, 185000),
          p("Baby Incubator", 180000, 180000),
        ],
      },
    ],
  },
  {
    slug: "hospital-furniture",
    name: "Hospital Furniture & Ward Equipment",
    tagline: "Built for comfort, durability and efficient care.",
    description:
      "Beds, trolleys and ward furniture designed for busy hospital environments.",
    subcategories: [
      {
        name: "Beds & Bedside",
        products: [
          p("2 Crank ABS Hospital Bed", 25000, 25000),
          p("Bedside Cabinet", 8500, 8500),
          p("Ripple Mattress", 4999, 4999),
        ],
      },
      {
        name: "Trolleys",
        products: [
          p("Emergency Trolley / Crash Cart", 55000, 55000),
          p("Medicine Trolley", 8000, 8000),
          p("3 Shelf Medicine Trolley", 13000, 13000),
        ],
      },
      {
        name: "Ward Support",
        products: [
          p("3 Fold Ward Screen", 7500, 7500),
          p("4 Fold Ward Screen", 9000, 9000),
          p("LED Adjustable Examination Lamp", 12500, 12500),
          p("Sanitary Bin", 3500, 3500),
        ],
      },
    ],
  },
  {
    slug: "theater-emergency",
    name: "Theatre & Emergency",
    tagline: "Equipment for critical care and surgical excellence.",
    description:
      "Surgical theatre equipment, biohazard control and emergency response supplies.",
    subcategories: [
      {
        name: "Surgical Theatre",
        products: [p("Diathermy Machine 400W", 170000, 170000)],
      },
      {
        name: "Emergency & Biohazard",
        products: [
          p("Multi-use Biohazard Spill Kit", 19500, 19500),
          p("First Aid Box", 2500, 3000),
          p("White Body Bag 220x90", 1500, 1800),
          p("Fogging Machine", 30000, 30000),
        ],
      },
    ],
  },
  {
    slug: "imaging-radiology",
    name: "Imaging & Radiology",
    tagline: "Accurate imaging for better diagnosis.",
    description: "Ultrasound systems, viewers, contrast media and imaging consumables.",
    subcategories: [
      {
        name: "Ultrasound Systems",
        products: [
          p("DP-20 Mindray Ultrasound", 680000, 680000),
          p("VINNO A3 Color Doppler Ultrasound", 1100000, 1100000),
        ],
      },
      {
        name: "Imaging Accessories",
        products: [
          p("Ultrasound Gel", 1500, 1500),
          p("Single X-Ray Viewer", 7500, 7500),
          p("UPP-110HG X-Ray Thermal Paper", 950, 1200),
          p("Omnipaque Contrast Medium", 2500, 2500),
        ],
      },
    ],
  },
  {
    slug: "ophthalmic-eye-care",
    name: "Ophthalmic & Eye Care",
    tagline: "Complete vision-care workstations and diagnostics.",
    description:
      "Ophthalmic refraction units, diagnostics and optical workshop equipment for eye clinics and optical centres.",
    subcategories: [
      {
        name: "Refraction & Exam",
        products: [
          p("Ophthalmic Refraction Unit (Chair & Stand)", 385000, 420000),
          p("Auto Refractometer", 480000, 520000),
          p("Slit Lamp Microscope", 265000, 295000),
          p("Trial Lens Set (266 pcs)", 38000, 45000),
        ],
      },
      {
        name: "Optical Workshop",
        products: [
          p("Digital Lensmeter", 145000, 165000),
          p("Pupillometer", 18500, 22000),
          p("Lens Edger (Semi-Auto)", 320000, 350000),
        ],
      },
    ],
  },
];

export const CATEGORIES: Category[] = RAW_CATEGORIES.map((c) => ({ ...c, image: IMG[c.slug] }));

export const COMPANY = {
  name: "Zentramed Health",
  tagline: "Advancing Healthcare and Humanitarian Solutions",
  address: "Bazaar Plaza, 9th Floor, Suite A901, Nairobi, Kenya",
  phones: ["+254 722 708 420", "+254 759 228 552"],
  email: "info@zentramedhealth.co.ke",
  website: "www.zentramedhealth.co.ke",
  social: "@zentramedhealth",
  whatsapp: "254722708420",
};

export function formatKES(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function allProducts() {
  return CATEGORIES.flatMap((c) =>
    c.subcategories.flatMap((s) =>
      s.products.map((prod) => ({
        ...prod,
        category: c.name,
        categorySlug: c.slug,
        subcategory: s.name,
        categoryImage: c.image,
      })),
    ),
  );
}
