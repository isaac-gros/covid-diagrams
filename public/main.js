let button = document.getElementById('update-diagram')
let arr = []

button.addEventListener('click', async function() {
	let date_value = document.getElementById('date-value').value
	let department_value = document.getElementById('state').value
	let ctx = document.getElementById('diagram');
	let ctx_max = document.getElementById('diagram-container');

	if (date_value !== "" && department_value !== undefined) {

		/**
		 * Front Request
		 * Exemple : (2020-01-01, DEP-75)
		 */
		try {
			const response = await axios.get(`/update/${date_value}/${department_value}`)
			const result = await response.data


			if (result !== undefined) {
				arr = result.array
				// Make an array with string has been return
				let myChart = new Chart(ctx, {
					responsive: false,
					maintainAspectRatio: false,
					type: 'bar',
					data: {
						labels: ['Hospitalisés', 'En réanimation', 'Nouveaux hospitalisés', 'Nouveaux en réanimations', 'Décès', 'Guéris'],
						datasets: [{
							data: arr,
							backgroundColor: [
								'rgba(230, 199, 44, 0.2)',
								'rgba(230, 156, 44, 0.2)',
								'rgba(44, 137, 230, 0.2)',
								'rgba(53, 44, 230, 0.2)',
								'rgba(230, 44, 44, 0.2)',
								'rgba(67, 209, 67, 0.2)'
							],
							borderColor: [
								'rgba(230, 199, 44, 1)',
								'rgba(230, 156, 44, 1)',
								'rgba(44, 137, 230, 1)',
								'rgba(53, 44, 230, 1)',
								'rgba(230, 44, 44, 1)',
								'rgba(67, 209, 67, 1)',
							],
							borderWidth: 2
						}]
					},
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
					}
				});
				return myChart
			}
		} catch (err) {
			let alert = document.createElement('DIV')
			let textNode = document.createTextNode("The date or the department is not correct to get data")
			alert.classList.add('alert', 'alert-danger')
			alert.appendChild(textNode)
			ctx_max.appendChild(alert)
		}
	}

})