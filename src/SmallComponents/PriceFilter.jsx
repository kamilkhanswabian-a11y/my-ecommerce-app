import * as Slider from "@radix-ui/react-slider";
import { useContext } from "react";
import { FilterContext } from "../Context/FilteterContext";

function PriceFilter() {
  const { priceRange, setpriceRange } = useContext(FilterContext);

  return (
    <div className="mt-6 px-4">
      <h3 className="mb-4 font-semibold">Price</h3>

      <div className="mb-4 flex justify-between text-sm">
        <span>${priceRange.min}</span>
        <span>${priceRange.max}</span>
      </div>

      <Slider.Root
        className="relative flex w-full touch-none select-none items-center"
        value={[priceRange.min, priceRange.max]}
        onValueChange={(value) =>
          
          setpriceRange({
            min: value[0],
            max: value[1],
          })
        }
        min={0}
        max={1000}
        step={1}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-2 grow overflow-hidden rounded-full bg-gray-200">
          <Slider.Range className="absolute h-full bg-black" />
        </Slider.Track>

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-black bg-white shadow-md focus:outline-none"
          aria-label="Minimum price"
        />

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-black bg-white shadow-md focus:outline-none"
          aria-label="Maximum price"
        />
      </Slider.Root>
    </div>
  );
}

export default PriceFilter;