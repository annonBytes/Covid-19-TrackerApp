import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Charts.module.css'


const Chart = ({data: { confirmed, recovered, deaths }, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchMyAPI = async () => {
          const initialDailyData = await fetchDailyData();
    
          setDailyData(initialDailyData);
        };
    
        fetchMyAPI();
      }, []);






    const barChart = (
        confirmed ?
        ( <Bar 
            data = {{
                labels: ['Infected', 'Recovered', 'Death'],
                datasets: [
                    {
                        label: 'people',
                        backgroundColor: [
                        `rgba(0, 0, 255, 0.5)`,
                        `rgba(0, 255, 0, 0.5)`,
                        `rgba(250, 38, 38, 0.5)`],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }

                ]
                
  
            }}
  
            options = {{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`}
            }}
            />) : null
      );



    const lineChart = (
        dailyData[0]?
        ( <Line 
         data = {{
             labels: dailyData.map(({date}) => date),
             datasets: [
                 {
                     data: dailyData.map(({confirmed}) => confirmed),
                     label: 'Infected',
                     borderColor: "#3333ff",
                     fill: true,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                     pointHoverBorderColor: 'rgba(220,220,220,1)',
                     pointHoverBorderWidth: 2,
                     pointRadius: 1,
                     pointHitRadius: 10,
       
                 }, 

                 {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true, 
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,0.5)',
                    pointHoverBorderColor: 'rgba(255,0,0,0.5)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                
                 }
                ]

         }}
        />) : null 
    );


    return(
        <div className={styles.container}>
          {country ? barChart : lineChart}
        </div>
    );
}

export default Chart












    
   