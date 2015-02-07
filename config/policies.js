/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
  // 

    ClarificationController: {
      '*': ['tokenAuth', 'teamAndJury'],
    }, 

    ContestController: {
      '*': ['tokenAuth', 'teamAndJury'],
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
      '*': ['tokenAuth', 'jury']
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
        '*': ['tokenAuth', 'admin'],
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
