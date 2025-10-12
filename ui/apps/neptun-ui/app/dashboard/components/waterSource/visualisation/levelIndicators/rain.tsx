import { FaCloudRain, FaRegSun } from 'react-icons/fa6';

type RainProps = { isRaining: boolean };

export const Rain = ({ isRaining } : RainProps) => {
  return isRaining ? <FaCloudRain className="size-[7rem]"/> : <FaRegSun className="size-[7rem]"/>
}
