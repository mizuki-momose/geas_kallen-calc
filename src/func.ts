const eratosthenes = (n: number) => {
  const primes = [];
  const isPrime = new Array(n + 1).fill(true);

  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return primes;
};

const primeFactorizeKaijo = (n: number, primeNumbers: number[]) => {
  const res: { [key: number]: number } = {};

  primeNumbers.forEach((i) => {
    if (i > n) return;
    let temp = i;
    let restemp = 0;
    while (temp <= n) {
      restemp += Math.trunc(n / temp);
      temp *= i;
    }
    res[i] = restemp;
  });

  return res;
};

const primeFactorize = (n: number, primeNumbers: number[]) => {
  const res: { [key: number]: number } = {};
  let temp = n;

  primeNumbers.forEach((i) => {
    if (i > temp) return;

    while (temp % i == 0) {
      if (i in res) {
        res[i] += 1;
      } else {
        res[i] = 1;
      }
      temp /= i;
    }
  });

  return res;
};

const calculatePowMul = (
  ans: number[],
  fact: { [key: number]: number },
  power: number,
) => {
  Object.entries(fact).forEach(([k, v]) => {
    ans[+k] += v * power;
  });
};

const getPow = async (obj: { [key: number]: number }) =>
  Object.entries(obj).reduce((a, [k, v]) => a * BigInt(k) ** BigInt(v), 1n);

const calc = async (n: number, k: number, p1: number, p2: number) => {
  if (p2 === 0) return 0;

  const max_int = Math.max(n, k, p1, p2);

  const primeNumbers = eratosthenes(max_int);

  const pbunbo_fact = primeFactorize(p2, primeNumbers);
  const pbunshi_fact = primeFactorize(p1, primeNumbers);
  const qbunshi_fact = primeFactorize(p2 - p1, primeNumbers);
  const nkaijo_fact = primeFactorizeKaijo(n, primeNumbers);
  const kkaijo_fact = primeFactorizeKaijo(k, primeNumbers);
  const nmkkaijo_fact = primeFactorizeKaijo(n - k, primeNumbers);

  const ans: number[] = new Array(max_int + 1).fill(0);
  calculatePowMul(ans, pbunbo_fact, -n);
  calculatePowMul(ans, pbunshi_fact, k);
  calculatePowMul(ans, qbunshi_fact, n - k);
  calculatePowMul(ans, nkaijo_fact, 1);
  calculatePowMul(ans, kkaijo_fact, -1);
  calculatePowMul(ans, nmkkaijo_fact, -1);

  const plus: { [key: number]: number } = {};
  const minus: { [key: number]: number } = {};
  primeNumbers.forEach((i) => {
    if (ans[i] > 0) plus[i] = ans[i];
    if (ans[i] < 0) minus[i] = Math.abs(ans[i]);
  });

  let [powplus, powminus] = await Promise.all([getPow(plus), getPow(minus)]);

  const length = powplus.toString().length;

  if (length > 15) {
    const adjust = 10n ** BigInt(length - 15);
    powplus /= adjust;
    powminus /= adjust;
  }

  return Number(powplus) / Number(powminus);
};

export const probCalc = async (
  n: number,
  k: number,
  p1: number,
  probArr: number[],
) => {
  return Promise.all(probArr.map((p2) => calc(n, k, p1, p2)));
};
