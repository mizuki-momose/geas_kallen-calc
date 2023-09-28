const eratosthenes = (n: number) => {
  const primes: number[] = [];
  const isPrime = Array<boolean>(n + 1).fill(true);

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
  const res = new Map<number, number>();

  primeNumbers.forEach((i) => {
    if (i > n) return;
    let temp = i;
    let restemp = 0;
    while (temp <= n) {
      restemp += Math.trunc(n / temp);
      temp *= i;
    }
    res.set(i, restemp);
  });

  return res;
};

const primeFactorize = (n: number, primeNumbers: number[]) => {
  const res = new Map<number, number>();
  let temp = n;

  primeNumbers.forEach((i) => {
    if (i > temp) return;

    while (temp % i == 0) {
      res.set(i, res.has(i) ? res.get(i)! + 1 : 1);
      temp /= i;
    }
  });

  return res;
};

const calculatePowMul = (
  ans: number[],
  fact: Map<number, number>,
  power: number
) => {
  fact.forEach((v, k) => {
    ans[k] += v * power;
  });
};

const getPow = async (obj: Map<number, number>) =>
  [...obj].reduce((a, [k, v]) => a * BigInt(k) ** BigInt(v), 1n);

export const probCalc = async (
  n: number,
  k: number,
  p1: number,
  p2: number
) => {
  if (p2 === 0) return 0;

  const max_int = Math.max(n, k, p1, p2);

  const primeNumbers = eratosthenes(max_int);

  const ans = Array<number>(max_int + 1).fill(0);
  calculatePowMul(ans, primeFactorize(p2, primeNumbers), -n);
  calculatePowMul(ans, primeFactorize(p1, primeNumbers), k);
  calculatePowMul(ans, primeFactorize(p2 - p1, primeNumbers), n - k);
  calculatePowMul(ans, primeFactorizeKaijo(n, primeNumbers), 1);
  calculatePowMul(ans, primeFactorizeKaijo(k, primeNumbers), -1);
  calculatePowMul(ans, primeFactorizeKaijo(n - k, primeNumbers), -1);

  const plus = new Map<number, number>();
  const minus = new Map<number, number>();
  primeNumbers.forEach((i) => {
    if (ans[i] > 0) plus.set(i, ans[i]);
    if (ans[i] < 0) minus.set(i, Math.abs(ans[i]));
  });

  let [powplus, powminus] = await Promise.all([getPow(plus), getPow(minus)]);

  const ajust = powplus.toString().length - 15;

  if (ajust > 0) {
    const adjust = 10n ** BigInt(ajust);
    powplus /= adjust;
    powminus /= adjust;
  }

  return Number(powplus) / Number(powminus);
};
