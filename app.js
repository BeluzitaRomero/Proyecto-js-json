const productosJSON = "productos.json";

const carrito = [];

//variables a usar en las 3 funciones de total a pagar
let mostrarTotal = document.getElementById("mostrarTotal");
let imprimirTotal = document.createElement("p");

function cardTortaYPush() {
  $.getJSON(productosJSON, function (respuesta, estado) {
    if (estado === "success") {
      let tortas = respuesta.tortas;
      for (const torta of tortas) {
        renderDOMTorta(torta);
        mostrarTotalYPushTorta(torta);
        animacionPushTorta(torta);
      }
    }
  });
}

function renderDOMTorta(torta) {
  $(".container-card").append(`
              <div id=${torta.id} class="card">
                <img
                  class="img-card"
                  src=${torta.img}
                  alt=${torta.alt}
                />
                <p class="descripcion"> ${torta.name}</p>
                <p>$ ${torta.precio}</p>
                <button id="btn${torta.id}">Agregar al carrito</button>
                <div>
                <p id="animacion${torta.id}agregada" class="agregado" style="display: none">Se agregó al carrito</p>
                <p id="animacion${torta.id}carrito" class="ver-carrito" style="display: none">Mira tu lista en el carrito</p>
                </div>
              </div>
              `);
}

function mostrarTotalYPushTorta(torta) {
  //--------AGREGAR TORTAS AL CARRITO Y MOSTRAR SELECCION
  $(`#btn${torta.id}`).on("click", function () {
    //mostrar seleccion
    let listaTortas = document.getElementById("listado");
    let seleccionado = document.createElement("tr");
    seleccionado.innerHTML = `<td>${torta.name}</td>
                          <td>$${torta.precio}</td>
`;
    listaTortas.append(seleccionado);

    // PUSH AL CARRITO
    carrito.push(torta);

    //Numero de productos en el carrito
    $(`#nro-carrito`).ready(function () {
      let cantidadProducto = document.getElementById("nro-carrito");
      cantidadProducto.innerHTML = `<p id="nro-carrito">${carrito.length}</p>`;
    });

    totalAPagar();
  });
}

function animacionPushTorta(torta) {
  //---------------------------ANIMACION-----------------------------------
  $(`#btn${torta.id}`).on("click", function () {
    $(`#animacion${torta.id}agregada`)
      .css("color", "#9932cc", "text-align", "center")
      .fadeIn(1000)
      .delay(1000)
      .fadeOut(1000);
    $(`#animacion${torta.id}carrito`)
      .css("color", "#9932cc")
      .css("text-align", "center")
      .delay(3000)
      .fadeIn(1000)
      .fadeOut(1000);
  });
}

/////////////////////////Mini Tortas///////////////////////////////////

function cardMiniTortaYPush() {
  $.getJSON(productosJSON, function (respuesta, estado) {
    if (estado === "success") {
      let miniTortas = respuesta.miniTortas;
      for (const mini of miniTortas) {
        renderDOMMiniTorta(mini);
        mostrarTotalYPushMiniTorta(mini);
        animacionPushMiniTorta(mini);
      }
    }
  });
}

function renderDOMMiniTorta(mini) {
  $(".mini-tortas").append(`
            <div id=${mini.id} class="card">
              <img
                class="img-card"
                src=${mini.img}
                alt=${mini.alt}
              />
              <p class="descripcion"> ${mini.name}</p>
              <p>$ ${mini.precio}</p>
              <button id="btn${mini.id}">Agregar al carrito</button>
              <div>
              <p id="animacion${mini.id}agregada" class="agregado" style="display: none">Se agregó al carrito</p>
              <p id="animacion${mini.id}carrito" class="ver-carrito" style="display: none">Mira tu lista en el carrito</p>
              </div>
            </div>
            `);
}

function mostrarTotalYPushMiniTorta(mini) {
  //------------ HACER PUSH AL CARRITO Y MOSTRAR SELECCION
  $(`#btn${mini.id}`).on("click", function () {
    //mostrar seleccion
    let listaTortas = document.getElementById("listado");
    let seleccionado = document.createElement("tr");
    seleccionado.innerHTML = `<td>${mini.name}</td>
                          <td>$${mini.precio}</td>
`;
    listaTortas.append(seleccionado);

    // PUSH AL CARRITO
    carrito.push(mini);

    //Numero de productos en el carrito
    $(`#nro-carrito`).ready(function () {
      let cantidadProducto = document.getElementById("nro-carrito");
      cantidadProducto.innerHTML = `<p id="nro-carrito">${carrito.length}</p>`;
    });

    totalAPagar();
  });
}

function animacionPushMiniTorta(mini) {
  //---------------------------ANIMACION-----------------------------------
  $(`#btn${mini.id}`).on("click", function () {
    $(`#animacion${mini.id}agregada`)
      .css("color", "#9932cc", "text-align", "center")
      .fadeIn(1000)
      .delay(1000)
      .fadeOut(1000);
    $(`#animacion${mini.id}carrito`)
      .css("color", "#9932cc")
      .css("text-align", "center")
      .delay(3000)
      .fadeIn(1000)
      .fadeOut(1000);
  });
}

/////////////////////////Acompañamientos//////////////////////////
function cardAcompaniamientoYPush() {
  $.getJSON(productosJSON, function (respuesta, estado) {
    if (estado === "success") {
      let acompaniamientos = respuesta.acompaniamientos;
      for (const producto of acompaniamientos) {
        renderDOMAcompaniamiento(producto);

        mostrarTotalYPushAcompaniamiento(producto);

        animacionPushAcompaniamiento(producto);
      }
    }
  });
}

function renderDOMAcompaniamiento(producto) {
  //DOM ------------ CARD ACOMPAÑAMIENTO
  $(".acompañamiento").append(`
              <div id=${producto.id} class="card">
                <img
                  class="img-card"
                  src=${producto.img}
                  alt=${producto.alt}
                />
                <p class="descripcion"> ${producto.name}</p>
                <p>$ ${producto.precio}</p>
                <button id="btn${producto.id}">Agregar al carrito</button>
                <div>
                <p id="animacion${producto.id}agregada" class="agregado" style="display: none">Se agregó al carrito</p>
                <p id="animacion${producto.id}carrito" class="ver-carrito" style="display: none">Mira tu lista en el carrito</p>
                </div>
              </div>
              `);
}

function mostrarTotalYPushAcompaniamiento(producto) {
  // HACER PUSH AL CARRITO Y MOSTRAR SELECCION
  $(`#btn${producto.id}`).on("click", function () {
    //mostrar seleccion
    let listaTortas = document.getElementById("listado");
    let seleccionado = document.createElement("tr");
    seleccionado.innerHTML = `<td>${producto.name}</td>
                               <td>$${producto.precio}</td>
   `;
    listaTortas.append(seleccionado);

    // Push al carrito
    carrito.push(producto);

    //Numero de productos en el carrito
    $(`#nro-carrito`).ready(function () {
      let cantidadProducto = document.getElementById("nro-carrito");
      cantidadProducto.innerHTML = `<p id="nro-carrito">${carrito.length}</p>`;
    });

    totalAPagar();
  });
}

function animacionPushAcompaniamiento(producto) {
  //---------------------------ANIMACION-----------------------------------
  $(`#btn${producto.id}`).on("click", function () {
    $(`#animacion${producto.id}agregada`)
      .css("color", "#9932cc", "text-align", "center")
      .fadeIn(1000)
      .delay(1000)
      .fadeOut(1000);
    $(`#animacion${producto.id}carrito`)
      .css("color", "#9932cc")
      .css("text-align", "center")
      .delay(3000)
      .fadeIn(1000)
      .fadeOut(1000);
  });
}

/////////////////////TOTAL//////////////////////////
function totalAPagar() {
  //SUMAR TOTAL
  let total = 0;
  for (const sumaCarrito of carrito) {
    total = total + sumaCarrito.precio;
    console.log(total);

    if (carrito.length != 0) {
      imprimirTotal.innerHTML = `Total a pagar $${total}`;
      mostrarTotal.prepend(imprimirTotal);
    }
  }
}

///////////////////////////////////////////////

// -----------------------------OBJETO CLIENTE
class Cliente {
  constructor(dni, nombre, telefono, email, pedido) {
    this.dni = dni;
    this.nombres = nombre;
    this.telefono = telefono;
    this.email = email;
    this.pedido = pedido;
  }
}

function mostrarListaYCantidadEnCarrito() {
  $(document).ready(function () {
    $("#carrito-modal").hide();

    $("#carrito-toggle").click(function () {
      $("#carrito-modal").toggle("fast");
    });
  });

  //Numero de productos en el carrito
  $(`#nro-carrito`).ready(function () {
    let cantidadProducto = document.getElementById("nro-carrito");
    cantidadProducto.innerHTML = `<p id="nro-carrito">${carrito.length}</p>`;
  });
}

// MODAL DE REGISTRO DE USUARIO
const abrirModal = document.getElementById("registrar-compra");
const modalContainer = document.getElementById("modal_container");
const cerrarModal = document.getElementById("cerrar-modal");

abrirModal.addEventListener("click", () => {
  modalContainer.classList.add("show");
  $("#carrito-modal").hide();
});

cerrarModal.addEventListener("click", modalClose);

function modalClose() {
  modalContainer.classList.remove("show");
}

//-----------------FORMULARIO
let formSubmit = document.getElementById("myForm");

formSubmit.addEventListener("submit", registrarDatos);

function registrarDatos(e) {
  e.preventDefault();

  let formulario = e.target;

  let nomApeIngresado = document.getElementById("nombreApellido").value;

  let dniIngresado = document.getElementById("dni").value;

  let telIngresado = document.getElementById("tel").value;

  let emailIngresado = document.getElementById("email").value;

  let cliente = new Cliente(
    dniIngresado,
    nomApeIngresado,
    telIngresado,
    emailIngresado,
    carrito
  );

  localStorage.setItem(1, JSON.stringify(cliente));

  console.log(JSON.parse(localStorage.getItem(1)));

  formulario.reset();

  modalClose();

  location.reload();
}
cardTortaYPush();
cardMiniTortaYPush();
cardAcompaniamientoYPush();

mostrarListaYCantidadEnCarrito();
