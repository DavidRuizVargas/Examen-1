import React from 'react';

		// standard function
		function suma(a:number, b:number) {
			return a + b;
		}

		// arrow function
		const resta = (a:number, b:number) => {
			return a - b;
		}

		// arrow function with implicit return
		const multiplicacion = (a:number, b:number) => a * b;

		// arrow function with implicit return and one parameter
		const cuadrado = (a:number) => a * a;

		// arrow function with implicit return and no parameters
		const fecha = () => new Date();

		const saludo = () => 'Hola';

		const saludo2 = () => {
			return 'Hola';
		}

		const Funciones = () => {
			return (
				<div className="container">
					<h1>Funciones o subrutinas</h1>
					<br/>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Función</th>
								<th>Definición</th>
								<th>Tipo</th>
								<th>Valor</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>suma(10, 20)</td>
								<td>Standard function</td>
								<td>{typeof suma}</td>
								<td>{suma(10, 20)}</td>
							</tr>
							<tr>
								<td>resta(10, 20)</td>
								<td>Arrow function</td>
								<td>{typeof resta}</td>
								<td>{resta(10, 20)}</td>
							</tr>
							<tr>
								<td>multiplicacion(10, 20)</td>
								<td>Arrow function with implicit return</td>
								<td>{typeof multiplicacion}</td>
								<td>{multiplicacion(10, 20)}</td>
							</tr>
							<tr>
								<td>cuadrado(10)</td>
								<td>Arrow function with implicit return and one parameter</td>
								<td>{typeof cuadrado}</td>
								<td>{cuadrado(10)}</td>
							</tr>
							<tr>
								<td>fecha().toString()</td>
								<td>Arrow function with implicit return and no parameters</td>
								<td>{typeof fecha}</td>
								<td>{fecha().toString()}</td>
							</tr>
							<tr>
								<td>saludo()</td>
								<td>Arrow function with implicit return and no parameters</td>
								<td>{typeof saludo}</td>
								<td>{saludo()}</td>
							</tr>
							<tr>
								<td>saludo2()</td>
								<td>Arrow function with implicit return and no parameters</td>
								<td>{typeof saludo2}</td>
								<td>{saludo2()}</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}

		export default Funciones;