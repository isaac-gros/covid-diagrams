// Init ChartJS
let ctx = document.getElementById('diagram');
let chart = new Chart(ctx, {
	responsive: false,
	maintainAspectRatio: false,
	type: 'bar',
	options: {
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				label: function(tooltipItem) {
					return tooltipItem.yLabel;
				}
			}
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	},
	data: {
		labels: ['Hospitalisés', 'En réanimation', 'Nouveaux hospitalisés', 'Nouveaux en réanimations', 'Décès', 'Guéris'],
		datasets: [
			{
				data: [],
				backgroundColor: ['rgba(230, 199, 44, 0.2)','rgba(230, 156, 44, 0.2)','rgba(44, 137, 230, 0.2)','rgba(53, 44, 230, 0.2)','rgba(230, 44, 44, 0.2)','rgba(67, 209, 67, 0.2)'],
				borderColor: ['rgba(230, 199, 44, 1)','rgba(230, 156, 44, 1)','rgba(44, 137, 230, 1)','rgba(53, 44, 230, 1)','rgba(230, 44, 44, 1)','rgba(67, 209, 67, 1)'],
				borderWidth: 2
			}
		]
	}
});

let covidData = []
let alertArea = document.getElementById('alert');
let button = document.getElementById('update-diagram')

button.addEventListener('click', async function() {

	// Get the input values
	let date_value = document.getElementById('date-value').value
	let department_value = document.getElementById('state').value

	if (date_value !== "" && department_value !== undefined) {

		/**
		 * Front Request
		 * Exemple : (2020-01-01, DEP-75)
		 */
		try {
			const response = await axios.get(`/update/${date_value}/${department_value}`)
			const result = await response.data

			// Update chart
			if (Object.values(result).length > 0) {
				alertArea.classList.add('d-none');
				covidData = result.array
				chart.data.datasets[0].data = data;
				chart.update()
			} else {
				alertArea.classList.remove('d-none');
				alertArea.innerText = 'Aucune valeur trouvée pour les informations saisies.'
			}
		} catch (err) {
			if(err) {
				console.log(err)
				alertArea.classList.remove('d-none')
				alertArea.innerText = 'Une erreur est survenue, vérifiez la console ou réessayez.'
			}
		}
	}
})