// const fetchPlanets = () => {
//   useEffect(() => {
//     const url = 'https://swapi.dev/api/planets';

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const datajson = await response.json;
//         console.log(datajson);
//       } catch (error) {
//         console.log('error', error);
//       }
//     };
//     fetchData();
//   }, []);
// };

// export const fetchPlanets = () => {};

// function fetchPlanets() {
//   const [dataPlanets, setDataPlanets] = useState(null);

//   const fetchData = async () => {
//     const request = await fetch('https://swapi.dev/api/planets');
//     const data = await request.json();
//     setDataPlanets(data.results);
//     console.log(dataPlanets);
//     return dataPlanets;
//   };
//   return fetchData;
// }
// export const fetchData = async () => {
//   const response = await fetch('https://swapi.dev/api/planets');
//   const data = await response.json();
//   const dataResults = data.results;
//   console.log(dataResults);
//   return dataResults;
// };
export const fetchData = fetch('https://swapi.dev/api/planets').then((response) => response.json());
