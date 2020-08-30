module.exports = {
  validar (boleto) {
    try {
      if (!boleto)
        throw { message: 'Boleto não informado' }

      if (typeof boleto != 'string')
        throw { message: 'Formato inválido' }

      if (boleto.length == 54) {
        return this.validaBoletoPadrao(boleto)
      } else {
        // Dorgra fazer
        return {
          valido: true,
          valor: 0,
          vencimento: 0,
          codigo: 0
        }
      }
    } catch (error) {
      return {
        valido: false,
        message: error.message || 'Falha ao validar boleto',
        valor: null,
        vencimento: null,
        codigo: null
      }
    }
  },
  validaBoletoPadrao (boleto) {
    try {
      const [ campo1, campo2, campo3, campo4, campo5 ] = boleto.replace(/[.]/g, '').split(' ')

      if (!campo1 || !campo2 || !campo3 || !campo4 || !campo5)
        throw { message: 'Formato inválido' }

      const a = campo1.substr(0, 3),
            b = campo1.substr(3, 1),
            c = campo1.substr(4, 5),
            x = campo1.substr(9, 1)

      const d = campo2.substr(0, 10),
            y = campo2.substr(10, 1)

      const e = campo3.substr(0, 10),
            z = campo3.substr(10, 1)

      const k = campo4

      const u = campo5.substr(0, 4),
            v = campo5.substr(4, 10)

      if (!this.validarLinhaDigitavelPadrao(`${a}${b}${c}`, x, d, y, e, z))
        throw { message: 'Boleto inválido' }

      const valor      = this.getValor(v),
            vencimento = this.getVencimento(u),
            codigo     = `${a}${b}${c}${d}${e}${k}${u}${v}`

      return {
        valido: true,
        valor,
        vencimento,
        codigo
      }
    } catch (error) {
      return {
        valido: false,
        message: error.message || 'Falha ao validar boleto',
        valor: null,
        vencimento: null,
        codigo: null
      }
    }
  },
  validarLinhaDigitavelPadrao (campo1, verificador1, campo2, verificador2, campo3, verificador3) {
    let valido = false

    let multiplicador = 2

    function calculoMultiplicador(campo) {
      const campoReverso = campo.split('').reverse(),
            lista        = []

      var total = 0

      for (const index in campoReverso) {
        const algarismo = campoReverso[index]

        let multiplicacao = parseInt(algarismo) * multiplicador

        if (multiplicacao > 9) {
          const temp = `${multiplicacao}`.split('')

          let soma = 0

          for (const n of temp) {
            soma += parseInt(n)
          }

          multiplicacao = soma
        }

        total += multiplicacao

        lista.push(multiplicacao)

        if (multiplicador == 2)
          multiplicador = 1
        else
          multiplicador = 2
      }

      return total
    }

    let ultimoVerificador3 = 0,
        ultimoVerificador2 = 0,
        ultimoVerificador1 = 0

    const resultado3 = calculoMultiplicador(campo3)
    ultimoVerificador3 = (Math.ceil(resultado3 / 10) * 10) - (resultado3 % 10)

    const resultado2 = calculoMultiplicador(campo2)
    ultimoVerificador2 = (Math.ceil(resultado2 / 10) * 10) - (resultado2 % 10)

    const resultado1 = calculoMultiplicador(campo1)
    ultimoVerificador1 = (Math.ceil(resultado1 / 10) * 10) - (resultado1 % 10)

    ultimoVerificador3 = `${ultimoVerificador3}`
    ultimoVerificador3 = ultimoVerificador3[ultimoVerificador3.length - 1]

    ultimoVerificador2 = `${ultimoVerificador2}`
    ultimoVerificador2 = ultimoVerificador2[ultimoVerificador2.length - 1]

    ultimoVerificador1 = `${ultimoVerificador1}`
    ultimoVerificador1 = ultimoVerificador1[ultimoVerificador1.length - 1]

    return (ultimoVerificador3 == verificador3) && (ultimoVerificador2 == verificador2) && (ultimoVerificador1 == verificador1)
  },
  getValor (valor) {
    return (parseInt(valor) / 100).toFixed(2)
  },
  getVencimento (fatorVencimento) {
    const date = new Date('10/07/1997')

    date.setUTCDate(date.getUTCDate() + parseInt(fatorVencimento))

    return date
  }
}
