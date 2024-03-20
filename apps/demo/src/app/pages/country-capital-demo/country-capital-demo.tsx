import { CountryCapital } from '@practice-react/country-capital';

const DATA = {
  India: 'Delhi',
  Russia: 'Moscow',
  China: 'Beijing',
  France: 'Paris',
  Netherlands: 'Amsterdam',
  England: 'London',
  Germany: 'Berlin',
  Afghanistan: 'Kabul'
} as Record<string, string>;

export function CountryCapitalDemo() {
  return (
    <div>
      <CountryCapital countryMap={DATA} />
    </div>
  );
}

export default CountryCapitalDemo;
