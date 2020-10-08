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

document.getElementById('update-diagram').addEventListener('click', async function() {
	// Reset chart Data
	chart.data.datasets[0].data = []
	chart.update()

	// Get the input values
	let date_value = document.getElementById('date-value').value
	let department_value = document.getElementById('state').value

	if (date_value !== '' && department_value !== '') {

		updateAlertUser('Recherche en cours...', 'primary')
		try {
			let fetchResult = await fetchStatDataByDate(date_value, department_value)
			console.log(fetchResult)

			// // Update chart
			if (Object.values(fetchResult.data).length > 0) {
				chart.data.datasets[0].data = fetchResult.data.array;
				chart.update()
				updateAlertUser('Tableau mis à jour', 'success')
			} else {
				let message = 'Aucune valeur trouvée pour les informations saisies.'
				updateAlertUser(message)
			}
		} catch (err) {
			if(err) {
				console.log(err)
				let message = 'Une erreur est survenue, vérifiez la console ou réessayez.'
				updateAlertUser(message)
			}
		}
	} else {
		updateAlertUser('Veuillez compléter les champs ci-dessous.')
	}
})

// Inform user of it actions
function updateAlertUser(message = '', type = 'danger') {
	let alertArea = document.getElementById('alert');
	alertArea.classList.remove('alert-danger', 'alert-success', 'alert-primary')
	if(message.length > 0) {
		alertArea.innerText = message
		alertArea.classList.add('alert-' + type)
		alertArea.classList.remove('d-none')
	} else {
		alertArea.classList.add('d-none')
	}
}