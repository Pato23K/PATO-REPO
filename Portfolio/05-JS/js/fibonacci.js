var memo = {};

function fibonacci() {
  "use strict";
  var n = parseInt(document.getElementById("num").value);
  
  console.log("Número introducido: ", n);

  if (isNaN(n) || n < 0) {
    document.getElementById("fibonacciLbl").innerHTML = "Please enter a valid positive integer.";
    console.log("Número no válido.");
    return;
  }

  var val = f(n);
  
  console.log("Fibonacci(" + n + ") = " + val);

  document.getElementById("fibonacciLbl").innerHTML = "Fibonacci(" + n + ") = " + val;
  
  return val;
}

function f(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  if (memo.hasOwnProperty(n)) {
    return memo[n];
  }

  var value = f(n - 1) + f(n - 2);
  
  memo[n] = value;

  return value;
}

document.getElementById("btn").onclick = fibonacci;
