const productosJSON = "productos.json";

//variables a usar en las 3 funciones de total a pagar
let mostrarTotal = document.getElementById("mostrarTotal");
let imprimirTotal = document.createElement("p");

// ---------------------------- CLIENTE
class Cliente {
  constructor(dni, nombre, telefono, email, pedido) {
    this.dni = dni;
    this.nombres = nombre;
    this.telefono = telefono;
    this.email = email;
    this.pedido = pedido;
  }
}

const carrito = [];

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
    seleccionado.classList.add(`lista${torta.id}`);
    seleccionado.innerHTML = `<td><img src="${torta.img}" width=40 style="margin: .5rem; border-radius: .5rem"></td>
                              <td> ${torta.name}</td> 
                              <td>$${torta.precio}</td>
                              <td><button id="eliminar${torta.id}">X</button></td>
`;

    listaTortas.append(seleccionado);

    // PUSH AL CARRITO
    carrito.push(torta);
    console.log(carrito);

    numeroEnCarrito();

    eliminarTorta(torta);

    botonRegistrarCompra();

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

function eliminarTorta(torta) {
  $(`#eliminar${torta.id}`).on("click", function (e) {
    const boton = e.target;
    console.log(boton); //para ver que me esta tomando con el click

    const productoSeleccionado = carrito.find((p) => p.id === torta.id);
    const indexDelProductoSeleccionado = carrito.indexOf(productoSeleccionado);
    console.log(indexDelProductoSeleccionado);

    carrito.splice(indexDelProductoSeleccionado, 1);
    console.log(carrito);

    //Borrar en lista
    $(`.lista${torta.id}`).remove();

    numeroEnCarrito();

    totalAPagar();
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
    seleccionado.classList.add(`lista${mini.id}`);
    seleccionado.innerHTML = `<td><img src="${mini.img}" width=40 style="margin: .5rem; border-radius: .5rem"></td>
                              <td> ${mini.name}</td>  
                              <td>$${mini.precio}</td>
                              <td><button id="eliminar${mini.id}">X</button></td>
`;
    listaTortas.append(seleccionado);

    // PUSH AL CARRITO
    carrito.push(mini);

    numeroEnCarrito();

    eliminarMiniTorta(mini);

    botonRegistrarCompra();

    totalAPagar();
  });
}

function eliminarMiniTorta(mini) {
  $(`#eliminar${mini.id}`).on("click", function (e) {
    const boton = e.target;
    console.log(boton); //para ver que me esta tomando con el click

    const productoSeleccionado = carrito.find((p) => p.id === mini.id);

    const indexDelProductoSeleccionado = carrito.indexOf(productoSeleccionado);

    carrito.splice(indexDelProductoSeleccionado, 1);
    console.log(carrito);

    //Borrar en lista
    $(`.lista${mini.id}`).remove();

    totalAPagar();

    numeroEnCarrito();
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
  //------------ HACER PUSH AL CARRITO Y MOSTRAR SELECCION
  $(`#btn${producto.id}`).on("click", function () {
    //mostrar seleccion
    let listaTortas = document.getElementById("listado");
    let seleccionado = document.createElement("tr");
    seleccionado.classList.add(`lista${producto.id}`);
    seleccionado.innerHTML = `<td><img src="${producto.img}" width=40 style="margin: .5rem; border-radius: .5rem"></td>
                              <td> ${producto.name}</td>  
                              <td>$${producto.precio}</td>
                              <td><button id="eliminar${producto.id}">X</button></td>
`;
    listaTortas.append(seleccionado);

    // PUSH AL CARRITO
    carrito.push(producto);

    numeroEnCarrito();

    eliminarAcompaniamiento(producto);

    botonRegistrarCompra();

    totalAPagar();
  });
}

function eliminarAcompaniamiento(producto) {
  $(`#eliminar${producto.id}`).on("click", function (e) {
    const boton = e.target;
    console.log(boton); //para ver que me esta tomando con el click

    const productoSeleccionado = carrito.find((p) => p.id === producto.id);

    const indexDelProductoSeleccionado = carrito.indexOf(productoSeleccionado);

    carrito.splice(indexDelProductoSeleccionado, 1);
    console.log(carrito);

    //Borrar en lista
    $(`.lista${producto.id}`).remove();

    totalAPagar();

    numeroEnCarrito();
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
//------------------Compra-registro-carrito------------------
function botonRegistrarCompra() {
  if (carrito != 0) {
    $(`#registrar-compra`).css("visibility", "visible");
  } else if (carrito === 0) {
    $(`#registrar-compra`).hide();
  }
}

function numeroEnCarrito() {
  //Numero de productos en el carrito
  $(`#nro-carrito`).ready(function () {
    let cantidadProducto = document.getElementById("nro-carrito");
    cantidadProducto.innerHTML = `<p id="nro-carrito">${carrito.length}</p>`;
  });
}

function totalAPagar() {
  //actualizar total
  if (carrito == 0) {
    imprimirTotal.innerHTML = `Total a pagar $0`;
    mostrarTotal.prepend(imprimirTotal);
  } else {
    let total = 0;
    for (const sumaCarrito of carrito) {
      total = total + sumaCarrito.precio;
      //console.log(total);

      if (carrito.length != 0) {
        imprimirTotal.innerHTML = `Total a pagar $${total}`;
        mostrarTotal.prepend(imprimirTotal);
      }
    }
  }
}

function mostrarListaYCantidadEnCarrito() {
  $(document).ready(function () {
    $("#carrito-modal").hide();

    $(".img-carrito").click(function () {
      $("#carrito-modal").toggle("fast");
    });
  });

  numeroEnCarrito();
}

function registrarCompra() {
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

    let finalizarCompra = confirm("¿Desea finalizar su compra?");

    if (finalizarCompra) {
      localStorage.setItem(1, JSON.stringify(cliente));

      console.log(JSON.parse(localStorage.getItem(1)));

      formulario.reset();

      modalClose();

      alert(
        `¡Tu compra se ha realizado con exito! \n Nos comunicaremos a la brevedad para acordar el horario de retiro. \n Gracias por elegir Almacen de cosas dulces ♥`
      );

      location.reload();
    } else {
      modalClose();
    }
  }
}

//-----------TARJETAS Y FUNCIONES PUSH
cardTortaYPush();
cardMiniTortaYPush();
cardAcompaniamientoYPush();

//------------LISTA DE COMPRAS
mostrarListaYCantidadEnCarrito();

//------------REGISTRO DE COMPRA
registrarCompra();
