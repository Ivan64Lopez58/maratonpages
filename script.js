//---- CONFIGURACIÓN DEL EDITOR ------------------

const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: "text/x-c++src",
  lineNumbers: true,
  theme: "default"
});

// ------------------ CONSTANTES API JUDGE0 ------------------

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true";

const JUDGE0_HEADERS = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "bc0ee6f144msh9b0cc1e307632e5p19fb2fjsn75c437d7f3b1",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
};

// ------------------ DESCRIPCIONES DE EJERCICIOS ------------------

const ejercicios = {
  "collatz": {
    descripcion: `Dado un par de números i y j, imprime i, j y la mayor longitud de ciclo de Collatz entre i y j (inclusive).`,
    entrada: "1 10\n100 200\n201 210\n900 1000\n",
    salida: "1 10 20\n100 200 125\n201 210 89\n900 1000 174\n",
    codigoSolucion: `
#include <iostream>
using namespace std;

int cycle_length(int n) {
    int length = 1;
    while (n != 1) {
        if (n % 2 == 1)
            n = 3 * n + 1;
        else
            n /= 2;
        length++;
    }
    return length;
}

int main() {
    int i, j;
    while (cin >> i >> j) {
        int start = min(i, j);
        int end = max(i, j);
        int max_cycle = 0;

        for (int k = start; k <= end; k++) {
            int cl = cycle_length(k);
            if (cl > max_cycle)
                max_cycle = cl;
        }

        cout << i << " " << j << " " << max_cycle << endl;
    }
    return 0;
}
`
  },
        "recuperacion": {
    descripcion: `Dado un número entre 3 y 78, imprime la palabra de tres letras en minúscula más pequeña (lexicográficamente) cuya suma de posiciones alfabéticas sea igual al número.`,
    entrada: "3 24 78 3\n",
    salida: "aav zzz aaa\n",
    codigoSolucion: `
#include <iostream>
#include <string>
#include <sstream>
#include <vector>

using namespace std;

string obtenerPalabra(int n) {
    for (int i = 1; i <= 26; ++i) {
        for (int j = 1; j <= 26; ++j) {
            int k = n - i - j;
            if (k >= 1 && k <= 26) {
                // Convertimos los valores a letras
                char c1 = 'a' + i - 1;
                char c2 = 'a' + j - 1;
                char c3 = 'a' + k - 1;
                string palabra = "";
                palabra += c1;
                palabra += c2;
                palabra += c3;
                return palabra;
            }
        }
    }
    return "???"; // No debería ocurrir
}

int main() {
    string linea;
    getline(cin, linea);

    stringstream ss(linea);
    int t;
    ss >> t;

    vector<int> valores_n(t);
    for (int i = 0; i < t; ++i) {
        if (!(ss >> valores_n[i])) {
           // cerr << "Error al leer los valores de n." << endl;
            return 1;
        }
    }

    for (int i = 0; i < valores_n.size(); ++i) {
        cout << obtenerPalabra(valores_n[i]);
        if (i < valores_n.size() - 1) {
            cout << " ";
        }
    }
    cout << endl;

    return 0;
}
`
    },
      "binpacking": {
    descripcion: `Dado tres contenedores con botellas marrones, verdes y claras, reorganiza para que cada contenedor tenga solo un color y minimiza movimientos.`,
    entrada: `1 2 3 4 5 6 7 8 9`,
    salida: `BCG 30`,
    codigoSolucion: `
// Escribe tu código aquí

#include <cstdio>
#include <climits>
#include <cstring>
using namespace std;

int main() {
	int B[3], G[3], C[3];

	while (scanf("%d %d %d %d %d %d %d %d %d", &B[0], &G[0], &C[0], &B[1],
			&G[1], &C[1], &B[2], &G[2], &C[2]) != EOF) {
		int min = INT_MAX, temp;
		char ans[4];
		//BCG
		temp = C[0] + G[0] + B[1] + G[1] + B[2] + C[2];
		if (temp < min) {
			min = temp;
			strcpy(ans, "BCG");
		}
		//BGC
		temp = C[0] + G[0] + B[1] + C[1] + B[2] + G[2];
		if (temp < min) {
			min = temp;
			strcpy(ans, "BGC");
		}
		//CBG
		temp = B[0] + G[0] + C[1] + G[1] + B[2] + C[2];
		if (temp < min) {
			min = temp;
			strcpy(ans, "CBG");
		}
		//CGB
		temp = B[0] + G[0] + B[1] + C[1] + G[2] + C[2];
		if (temp < min) {
			min = temp;
			strcpy(ans, "CGB");
		}
		//GBC
		temp = C[0] + B[0] + C[1] + G[1] + B[2] + G[2];
		if (temp < min) {
			min = temp;
			strcpy(ans, "GBC");
		}
		//GCB
		temp = C[0] + B[0] + B[1] + G[1] + G[2] + C[2];
		if (temp < min) {
			min = temp;
			strcpy(ans, "GCB");
		}

		printf("%s %d\n",ans,min);
	}

	return 0;
}
`
    },
    "fizzbuzz": {
    descripcion: `Dado un número N, y dos divisores para "fizz" y "buzz", imprime del 1 a N:
    - "fizz" si divisible por el divisor de fizz,
    - "buzz" si divisible por el divisor de buzz,
    - "fizzbuzz" si divisible por ambos,
    - o el número en caso contrario.`,
    entrada: "15\n3\n5\n",
    salida:
`1
2
fizz
4
buzz
fizz
7
8
fizz
buzz
11
fizz
13
14
fizzbuzz
`,
codigoSolucion: `
#include <iostream>
using namespace std;

int main() {
    int N, fizzDiv, buzzDiv;
    cin >> N >> fizzDiv >> buzzDiv;

    for (int i = 1; i <= N; i++) {
        bool fizz = (i % fizzDiv == 0);
        bool buzz = (i % buzzDiv == 0);

        if (fizz && buzz)
            cout << "fizzbuzz\n";
        else if (fizz)
            cout << "fizz\n";
        else if (buzz)
            cout << "buzz\n";
        else
            cout << i << "\n";
    }

    return 0;
}


`
  },
    "opuesto_circular": {
    descripcion: "Dadas 3 personas en un círculo, donde a está frente a b, determina a quién está mirando c.",
    entrada: "4 10 2\n",
    salida: "8\n",
    codigoSolucion: `
#include <iostream>
#include <cmath>
using namespace std;

int encontrarOpuesto(int a, int b, int c) {
    int distancia = abs(a - b);
    int N = 2 * distancia;

    // Verificamos que N sea válido y que a, b, c estén dentro del rango
    if (a > N || b > N || c > N || distancia == 0)
        return -1;

    int opuesto = c + distancia;
    if (opuesto > N)
        opuesto -= N;

    return opuesto;
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;

    int resultado = encontrarOpuesto(a, b, c);
    cout << resultado << endl;

    return 0;
}
`
  }

};

// ------------------ CRONÓMETRO Y TIEMPO ------------------

let tiempoRestante = 2 * 60 * 60;
let temporizadorInterval = null;
let tiempoInicio = null;

function iniciarCuentaRegresiva() {
  clearInterval(temporizadorInterval);
  if (!tiempoInicio) tiempoInicio = new Date();

  actualizarVisual();

  temporizadorInterval = setInterval(() => {
    tiempoRestante--;

    if (tiempoRestante <= 0) {
      clearInterval(temporizadorInterval);
      document.getElementById("cronometro").innerText = "⛔ Tiempo finalizado";
      alert("Se ha agotado el tiempo para resolver el ejercicio.");
    } else {
      actualizarVisual();
    }
  }, 1000);
}

function actualizarVisual() {
  const h = String(Math.floor(tiempoRestante / 3600)).padStart(2, "0");
  const m = String(Math.floor((tiempoRestante % 3600) / 60)).padStart(2, "0");
  const s = String(tiempoRestante % 60).padStart(2, "0");
  document.getElementById("cronometro").innerText = `⏳ Tiempo restante: ${h}:${m}:${s}`;
}

// ------------------ MOSTRAR DESCRIPCIÓN ------------------

function mostrarDescripcion() {
  const clave = document.getElementById("ejercicio").value;
  if (ejercicios[clave]) {
    document.getElementById("descripcion-ejercicio").innerText = ejercicios[clave].descripcion;
    if (!temporizadorInterval) {
      iniciarCuentaRegresiva();
    }
  } else {
    document.getElementById("descripcion-ejercicio").innerText = "";
  }
}

mostrarDescripcion();

// ------------------ FUNCIONES DE SIMILITUD ------------------

function calcularSimilitud(a, b) {
  const levDist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return Math.round((1 - levDist / maxLen) * 100);
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

// ------------------ EVALUAR CÓDIGO ------------------

async function evaluarCodigo() {
  const nombre = document.getElementById("username").value.trim();
  const codigoAlumno = document.getElementById("alumnoID").value.trim();
  const codigo = editor.getValue();
  const clave = document.getElementById("ejercicio").value;
  const ejercicio = ejercicios[clave];

  if (!nombre || !codigoAlumno || codigo.length < 10) {
    alert("Por favor, completa nombre, código y un código fuente válido.");
    return;
  }

  if (tiempoRestante <= 0) {
    alert("No puedes enviar tu solución porque el tiempo ha terminado.");
    return;
  }

  document.getElementById("output").innerText = "⏳ Evaluando código...";

  const body = {
    language_id: 54,
    source_code: btoa(unescape(encodeURIComponent(codigo))),
    stdin: btoa(unescape(encodeURIComponent(ejercicio.entrada)))
  };

  try {
    const res = await fetch(JUDGE0_API_URL, {
      method: "POST",
      headers: JUDGE0_HEADERS,
      body: JSON.stringify(body)
    });

    const data = await res.json();

    const salidaObtenida = data.stdout ? atob(data.stdout).trim() : "";
    const salidaEsperada = ejercicio.salida.trim();
    const passed = salidaObtenida === salidaEsperada;

    let output = "";

    if (passed) {
      output += "✅ ¡Correcto!\n";
    } else {
      output += "❌ Incorrecto\n";
      output += "Esperado: " + salidaEsperada + "\n";
      output += "Obtenido: " + salidaObtenida + "\n";
    }

    const similitud = calcularSimilitud(codigo, ejercicio.codigoSolucion.trim());
    output += `\n📊 Puntaje de código: ${similitud}\n`;

    if (data.compile_output) {
      output += "\n🛠️ Errores de compilación:\n" + atob(data.compile_output);
    }

    if (data.stderr) {
      output += "\n💥 Errores de ejecución:\n" + atob(data.stderr);
    }

    document.getElementById("output").innerText = output;

    const estado = passed ? "Correcto" : "Incorrecto";
    //guardarRanking(nombre, codigoAlumno, clave, estado, similitud);
   
  } catch (err) {
    document.getElementById("output").innerText = "❌ Error al evaluar código: " + err.message;
  }


    // Al final de la función evaluarCodigo()

    // Eliminar el ejercicio del combobox tras evaluación exitosa
    const combo = document.getElementById("ejercicio");
    const selectedOption = combo.options[combo.selectedIndex];
    if (selectedOption) {
    combo.remove(combo.selectedIndex);
    }

    mostrarTablaAcumulada();
    cargarTablaAcumuladaDesdeFirebase();


}

// ------------------ GUARDAR Y MOSTRAR RANKING ------------------

async function guardarRanking(nombre, codigoAlumno, ejercicio, estado, similitud) {
  const tiempoFin = new Date();
  const tiempoMs = tiempoFin - tiempoInicio;
  const tiempoFormato = new Date(tiempoMs).toISOString().substr(11, 8);

  const data = {
    nombre,
    codigoAlumno,
    ejercicio,
    estado,
    similitud,
    fechaInicio: tiempoInicio.toLocaleString(),
    tiempo: tiempoFormato,
    timestamp: firebase.firestore.Timestamp.now()
  };

  try {
    await db
      .collection("ranking")
      .add(data); // crea un nuevo documento por envío
    console.log("✔ Resultado guardado en Firebase.");
  } catch (error) {
    console.error("❌ Error guardando resultado:", error);
  }
}

async function mostrarRanking() {
  try {
    const snapshot = await db
      .collection("ranking")
      .orderBy("timestamp", "desc")
      .get();

    const filas = snapshot.docs.map((doc, i) => {
      const r = doc.data();
      return `
        <tr>
          <td>${i + 1}</td>
          <td>${r.nombre}</td>
          <td>${r.codigoAlumno}</td>
          <td>${r.ejercicio}</td>
          <td>${r.estado}</td>
          <td>${r.similitud ?? '—'}</td>
          <td>${r.fechaInicio}</td>
          <td>${r.tiempo}</td>
        </tr>
      `;
    }).join("");

    document.getElementById("ranking").innerHTML = `
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Ejercicio</th>
            <th>Estado</th>
            <th>Puntaje</th>
            <th>Fecha/Hora inicio</th>
            <th>Tiempo usado</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    `;
  } catch (error) {
    console.error("❌ Error al mostrar ranking desde Firebase:", error);
  }
}


function borrarConcursantes() {
  localStorage.removeItem("ranking");
  mostrarRanking();
}


async function mostrarTablaAcumulada() {
  try {
    const snapshot = await db.collection("ranking").get();

    const acumulado = {};

    snapshot.forEach(doc => {
      const r = doc.data();
      if (!acumulado[r.codigoAlumno]) {
        acumulado[r.codigoAlumno] = {
          nombre: r.nombre,
          codigoAlumno: r.codigoAlumno,
          puntajeTotal: 0,
          ejerciciosResueltos: 0
        };
      }
      acumulado[r.codigoAlumno].puntajeTotal += (r.similitud || 0);
      acumulado[r.codigoAlumno].ejerciciosResueltos += 1;
    });

    const listaOrdenada = Object.values(acumulado).sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    // (opcional) Guardar también en otra colección
    listaOrdenada.forEach(guardarRankingAcumuladoFirestore);

    const filas = listaOrdenada.map((r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${r.nombre}</td>
        <td>${r.codigoAlumno}</td>
        <td>${r.ejerciciosResueltos}</td>
        <td>${r.puntajeTotal}</td>
      </tr>
    `).join("");

    document.getElementById("tabla-acumulada").innerHTML = `
      <h3>🏆 Ranking Acumulado</h3>
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Ejercicios resueltos</th>
            <th>Puntaje total</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    `;
  } catch (error) {
    console.error("❌ Error al mostrar acumulado desde Firebase:", error);
  }
}


async function guardarRankingAcumuladoFirestore(alumno) {
  const docRef = db.collection("rankingAcumulado").doc(alumno.codigoAlumno);
  await docRef.set(alumno); // sobrescribe o crea el documento
}

async function cargarTablaAcumuladaDesdeFirebase() {
  try {
    const snapshot = await db.collection("rankingAcumulado").get(); // CORREGIDO
    const lista = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      lista.push({
        nombre: data.nombre,
        codigoAlumno: data.codigoAlumno,
        ejerciciosResueltos: data.ejerciciosResueltos,
        puntajeTotal: data.puntajeTotal
      });
    });

    lista.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    const filas = lista.map((r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${r.nombre}</td>
        <td>${r.codigoAlumno}</td>
        <td>${r.ejerciciosResueltos}</td>
        <td>${r.puntajeTotal}</td>
      </tr>
    `).join("");

    document.getElementById("tabla-acumulada").innerHTML = `
      <h3>🏆 Ranking Acumulado</h3>
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Ejercicios resueltos</th>
            <th>Puntaje total</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `;

  } catch (error) {
    console.error("Error al cargar tabla acumulada desde Firebase:", error);
  }
}



window.onload = () => {
//  cargarTablaAcumuladaDesdeFirebase();
  mostrarRanking(); // si quieres mostrar el ranking local también
};
