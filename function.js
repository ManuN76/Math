/***************************************************************************
 * Calculation of a literary mathematical formula.
 *
 * Arithmetic operator (+ - / *)
 * -----------------------------
 * a % b = integer remainder of a division
 * a ** b = power
 * a % b = modulo !!! but use the correction : mod(a, b)
 *
 * Binary operator
 * ---------------
 * a & b = AND
 * a AND b = AND
 * a | b = OR
 * a OR b = OR
 * ~ a = NOT
 * NOT(a) = ~ a (not)
 * a << b = Binary shift to the left
 * a >> b = Binary shift to the right
 * a >>> b = Binary shift to the right when padding with zeros
 *
 * Math operator
 * -------------
 * abs(x), acos(x), acosh(x), asin(x), asinh(x), atan(x), atanh(x), atan2(y, x),
 * cbrt(x), ceil(x), clz32(x), cos(x),
 * exp(x), expml(x),
 * floor(x), fround(x),
 * hypot(x, y, ...),
 * imul(x,y)
 * log(x), loglp(x), log10(x), log2(x),
 * max(x, y, ...), min(x, y, ...),
 * pow(x, y), pi
 * random(), round(x),
 * sign(x), sin(x), sinh(x), sqrt(x),
 * tan(x), tanh(x), trunc(x)
 *
 * Specific characters
 * -------------------
 * √(a) = Square root
 * a ^ b = power
 *
 * Add
 * ---
 * mod(x, y) = x modulo y (correction)
 * sum(x, y, ...) = Sum
 *
 * Multiple variables
 * ------------------
 * !!!!!!!!!!! attention: the variables are not reset
 * a = 1 + 1; b = 50 * 2; a + b
 *
 * Restriction
 * -----------
 * You must not use [] or {} as a parenthesis
 *
 *****************************************************************************/

var mapObj = {
  and: "&",
  abs: "Math.abs",
  acos: "Math.acos", // Radian
  acosh: "Math.acosh",
  asin: "Math.asin", // Radian
  asinh: "Math.asinh",
  atan: "Math.atan", // Radian
  atanh: "Math.atanh",
  atan2: "Math.atan2", // Radian
  cbrt: "Math.cbrt",
  ceil: "Math.ceil",
  clz32: "Math.clz32",
  cos: "Math.cos", // Radian
  exp: "Math.exp",
  expml: "Math.expml",
  floor: "Math.floor",
  hypot: "Math.hypot",
  imul: "Math.imul", // Math.imul(x,y) !!!
  log: "Math.log",
  log1p: "Math.log1p",
  log10: "Math.log10",
  log2: "Math.log2",
  max: "Math.max",
  min: "Math.min",
  mod: "modulo", // Correction de Modulo mod(x,y)
  not: "~",
  or: "|",
  pi: "Math.PI",
  pow: "Math.pow", // Math.pow(x,y) !!! autre solution: ^ (**)
  ramdon: "Math.ramdon",
  round: "Math.round",
  sign: "Math.sign",
  sin: "Math.sin", // Radian
  sinh: "Math.sinh",
  sqrt: "Math.sqrt",
  sum: "somme", // Add sum(x, y, ...)
  tan: "Math.tan", // Radian
  tanh: "Math.tanh",
  trunc: "Math.trunc",
};

window.function = function (formule, deg, precision) {
  if (formule.value == undefined) return undefined;
  let str = formule.value ?? "";
  let format = deg.value ?? "rad";
  let pre = precision.value ?? 15;

  // Convertion en minuscule
  str = str.toLowerCase();
  format = format.toLowerCase();

  // Convertion des spécifiques en JS
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  str = str.replace(re, function (matched) {
    return mapObj[matched];
  });

  // Format Radian ou Degrée
  if (format == "deg") {
    str = str.replace(/acos\(/g, "acos((Math.PI/180)*");
    str = str.replace(/asin\(/g, "asin((Math.PI/180)*");
    str = str.replace(/atan\(/g, "atan((Math.PI/180)*");
    str = str.replace(/atan2\(/g, "atan2((Math.PI/180)*");
    str = str.replace(/cos\(/g, "cos((Math.PI/180)*");
    str = str.replace(/sin\(/g, "sin((Math.PI/180)*");
    str = str.replace(/tan\(/g, "tan((Math.PI/180)*");
  }

  // remplace ^ par **
  str = str.replace(/\^/g, "**");

  // remplace √ par racine carré
  str = str.replace(/√/g, "Math.sqrt");

  return Number.parseFloat(eval(str)).toFixed(pre);
};

// Modulo (correction ex -13 % 64 = -13 but mod(-13,64) = 51)
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function modulo(x, y) {
  return ((x % y) + y) % y;
}

// Add Sum (x, y, ...)
function somme(...args) {
  const t = [...args].reduce((acc, curr) => acc + curr, 0);

  return t;
}
