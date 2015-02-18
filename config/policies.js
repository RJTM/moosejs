

module.exports.policies = {

  
    ClarificationController: {
      '*': ['tokenAuth', 'teamAndJury'],
    }, 

    ContestController: {
      '*': ['tokenAuth', 'teamAndJury'],
      'user': 'cleanToken',
      'find': ['cleanToken'],
      'findOne': ['cleanToken'],
      'create': ['tokenAuth', 'admin'],
      'update': ['tokenAuth', 'juryAndUp'],
      'destroy': ['tokenAuth', 'admin'],
      'release': ['tokenAuth', 'jury'],
    },

    GradeController: {
      '*': ['tokenAuth', 'judgehost'],
      verify: ['tokenAuth', 'jury']
    },

    JudgehostController: {
      '*': ['tokenAuth', 'admin'],
      handshake: ['tokenAuth', 'judgehost'],
      subscribe: ['tokenAuth', 'judgehost'],
      unsubscribe: ['tokenAuth', 'judgehost'],
    },

    LanguageController: {
      '*': ['tokenAuth', 'juryAndUp'],
      'find': 'tokenAuth'
    },

    PrintController: {
      '*': ['tokenAuth','staff'],
      'create': ['tokenAuth', 'teamAndJury']
    },

    RunController: {
      '*': ['tokenAuth', 'jury'],
      submit: ['tokenAuth', 'teamAndJury'],
      getResult: ['tokenAuth', 'jury'],
      team: ['tokenAuth', 'teamAndJury']
    },

    ScoreboardController: {
      '*': false,
      'index': 'cleanToken'
    },

    TaskController: {
      '*': ['tokenAuth', 'jury'],
      contest: ['tokenAuth', 'teamAndJury']
    },

    TestcaseController: {
      '*': ['tokenAuth', 'jury'],
      sync: ['tokenAuth', 'judgehost']
    },

    UserController: {
        '*': ['tokenAuth', 'juryAndUp'],
        'findOne': ['tokenAuth', 'juryAndUp'],
        'authenticate': true,
        'update': 'tokenAuth',
    },
    ProtectedFileController: {
        'download': ['tokenAuth', 'juryAndJudgehost'],
        'job': ['tokenAuth', 'staff']
    },
    '*': 'cleanToken'
};
