// Create an entity using the command: wd create-entity ./new_entity_with_the_same_references_being_used_multiple_times.js
// Running this command created https://www.wikidata.org/entity/Q75530678

const website = {
  P854: 'http://tempsnoir.com',
  P813: '2019-11-18'
}

const apropos = {
  P854: 'http://tempsnoir.com/a-propos/',
  P813: '2019-11-18'
}

const contact = {
  P854: 'http://tempsnoir.com/contact/',
  P813: '2019-11-18'
}

const frwiki = {
  P143: 'Q8447'
}

const societe = {
  P854: 'https://www.societe.com/societe/temps-noir-442842381.html',
  P813: '2019-11-18'
}

module.exports = {
  labels: {
    fr: 'Temps Noir'
  },
  descriptions: {
    fr: ' société de production audiovisuelle indépendante française spécialisée dans le documentaire et la fiction'
  },
  claims: {
    // instance of
    P31: { value: 'Q1762059', references: apropos },
    // official website
    P856: { value: 'http://tempsnoir.com' },
    // country
    P17: { value: 'Q142', references: apropos },
    // founded by
    P112: { value: 'Q29388566', references: frwiki },
    // inception
    P571: { value: '2002', references: [ apropos, societe ] },
    // e-mail address
    P968: { value: 'mailto:tempsnoir@tempsnoir.com', references: apropos },
    // headquarters location
    P159: { value: 'Q204622', references: contact },
    // located on street
    P669: { value: 'Q3412696', references: contact },
    // street number
    P670: { value: '13', references: contact },
    // YouTube channel ID
    P2397: { value: 'UCa4tYZkWEmOaSycRojQCPZA', references: website },
    // Twitter username
    P2002: { value: 'TempsNoir', references: website },
    // Facebook ID
    P2013: { value: 'temps.noir.7', references: website },
    // legal form
    P1454: { value: 'Q15091621', references: societe },
    // employees
    P1128: { value: 9, references: societe },
    // SIREN number
    P1616: { value: '442842381', references: societe }
  }
}
