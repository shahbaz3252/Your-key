import { ZodError } from "zod";
import { parsePropertyQuery } from "../lib/validators/property-query";

function run(label: string, query: string) {
  console.log(`\n--- ${label}: ?${query}`);
  try {
    console.dir(parsePropertyQuery(new URLSearchParams(query)), { depth: 4 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(
        "ZodError:",
        error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
      );
    } else {
      throw error;
    }
  }
}

run("1 valid", "purpose=buy&city=abu-dhabi&bedrooms=4%2B&sort=price-asc&minPrice=1000000&featured=true");
run("2 plus as space", "bedrooms=4+&propertyType=Villa&community=Dubai Marina");
run("3 empty", "");
run("4 bad values", "purpose=xyz&minPrice=-5");
run("5 bad range", "minArea=900&maxArea=100");