import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/db";

const amenities = [
  { slug: "swimming-pool", name: "Swimming Pool", nameAr: "مسبح", icon: "pool" },
  { slug: "gym", name: "Gym", nameAr: "نادي رياضي", icon: "gym" },
  { slug: "covered-parking", name: "Covered Parking", nameAr: "مواقف سيارات مغطاة", icon: "parking" },
  { slug: "balcony", name: "Balcony", nameAr: "شرفة", icon: "balcony" },
  { slug: "security-24-7", name: "24/7 Security", nameAr: "أمن على مدار الساعة", icon: "security" },
  { slug: "concierge", name: "Concierge Service", nameAr: "خدمة الكونسيرج", icon: "concierge" },
  { slug: "sea-view", name: "Sea View", nameAr: "إطلالة على البحر", icon: "sea-view" },
  { slug: "private-beach", name: "Private Beach Access", nameAr: "شاطئ خاص", icon: "beach" },
  { slug: "central-ac", name: "Central A/C", nameAr: "تكييف مركزي", icon: "ac" },
  { slug: "kids-play-area", name: "Kids Play Area", nameAr: "منطقة ألعاب للأطفال", icon: "kids" },
  { slug: "garden", name: "Private Garden", nameAr: "حديقة خاصة", icon: "garden" },
  { slug: "smart-home", name: "Smart Home", nameAr: "منزل ذكي", icon: "smart-home" },
] satisfies Prisma.AmenityCreateInput[];

export async function seedAmenities() {
  let created = 0;
  let skipped = 0;

  for (const amenity of amenities) {
    const existing = await prisma.amenity.findUnique({
      where: { slug: amenity.slug },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.amenity.create({ data: amenity });
    created++;
  }

  console.log(`Amenities: ${created} created, ${skipped} skipped`);
}