import { dayjs } from 'element-plus'

/* 
首先，我们定义一个GreetingStrategy类，它有一个greet方法用来返回问候语。
接下来，我们创建具体的策略类
NightOwlStrategy、MorningStrategy、ForenoonStrategy、NoonStrategy、
AfternoonStrategy和EveningStrategy，
它们分别表示不同的时间段的问候策略。
*/
class GreetingStrategy {
  greet() {}
}

class NightOwlStrategy extends GreetingStrategy {
  greet() {
    return '夜猫子好'
  }
}

class MorningStrategy extends GreetingStrategy {
  greet() {
    return '早上好'
  }
}

class ForenoonStrategy extends GreetingStrategy {
  greet() {
    return '上午好'
  }
}

class NoonStrategy extends GreetingStrategy {
  greet() {
    return '中午好'
  }
}

class AfternoonStrategy extends GreetingStrategy {
  greet() {
    return '下午好'
  }
}

class EveningStrategy extends GreetingStrategy {
  greet() {
    return '晚上好'
  }
}
/* 
接下来，我们创建一个GreetingContext类来封装策略的选择和执行过程。
它有一个setStrategy方法用来设置当前的策略，以及一个getGreeting方法用来获取问候语。
*/
class GreetingContext {
  strategy: any
  constructor() {
    this.strategy = null
  }

  setStrategy(strategy: any) {
    this.strategy = strategy
  }

  getGreeting() {
    if (this.strategy) {
      return this.strategy.greet()
    }
    return ''
  }
}

/* 
最后，我们将原来的代码重构为一个类。
*/
export class GreetingService {
  constructor(public context: any) {
    this.context = new GreetingContext()
    this.context.setStrategy(this.getStrategy())
  }

  getStrategy() {
    const nowHour = dayjs().hour()
    if (nowHour < 6) {
      return new NightOwlStrategy()
    } else if (nowHour < 9) {
      return new MorningStrategy()
    } else if (nowHour < 12) {
      return new ForenoonStrategy()
    } else if (nowHour < 14) {
      return new NoonStrategy()
    } else if (nowHour < 18) {
      return new AfternoonStrategy()
    } else if (nowHour < 24) {
      return new EveningStrategy()
    }
    return null
  }

  getCurrentHourText() {
    return this.context.getGreeting()
  }
}

const currentHourToText = () => {
  const nowHour = dayjs().hour()

  let text = ''

  const strategies = {
    夜猫子好: (hour: number) => hour < 6,
    早上好: (hour: number) => hour < 9,
    上午好: (hour: number) => hour < 12,
    中午好: (hour: number) => hour < 14,
    下午好: (hour: number) => hour < 18,
    晚上好: (hour: number) => hour < 24,
  }

  for (const [key, strategy] of Object.entries(strategies)) {
    if (strategy(nowHour)) {
      text = key

      break
    }
  }

  return text
}
currentHourToText()
