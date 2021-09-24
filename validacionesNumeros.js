function soloNumeros(e) {
  if (window.event) {
    keyNum = e.keyCode;
  } else {
    keyNum = e.which;
  }

  if ((keyNum > 47 && keyNum < 58) || keyNum == 8 || keyNum == 13) {
    return true;
  } else {
    return false;
  }
}

function soloNumerosYBarra(e) {
  if (window.event) {
    keyNum = e.keyCode;
  } else {
    keyNum = e.which;
  }

  if ((keyNum > 46 && keyNum < 58) || keyNum == 8 || keyNum == 13) {
    return true;
  } else {
    return false;
  }
}
