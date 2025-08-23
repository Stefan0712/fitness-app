export const muscles = [
  {_id: "chest", author: "system", name: "Chest", value: "chest"},
  {_id: "pectoralis-major", author: "system", name: "Pectoralis Major", value: "pectoralis-major", parent: "chest"},
  {_id: "pectoralis-minor", author: "system", name: "Pectoralis Minor", value: "pectoralis-minor", parent: "chest"},

  {_id: "back", author: "system", name: "Back", value: "back"},
  {_id: "latissimus-dorsi", author: "system", name: "Latissimus Dorsi", value: "latissimus-dorsi", parent: "back"},
  {_id: "trapezius", author: "system", name: "Trapezius", value: "trapezius", parent: "back"},
  {_id: "rhomboids", author: "system", name: "Rhomboids", value: "rhomboids", parent: "back"},
  {_id: "erector-spinae", author: "system", name: "Erector Spinae", value: "erector-spinae", parent: "back"},

  {_id: "shoulders", author: "system", name: "Shoulders", value: "shoulders"},
  {_id: "front-deltoid", author: "system", name: "Front Deltoid", value: "front-deltoid", parent: "shoulders"},
  {_id: "side-deltoid", author: "system", name: "Side Deltoid", value: "side-deltoid", parent: "shoulders"},
  {_id: "rear-deltoid", author: "system", name: "Rear Deltoid", value: "rear-deltoid", parent: "shoulders"},
  {_id: "rotator-cuff", author: "system", name: "Rotator Cuff", value: "rotator-cuff", parent: "shoulders"},

  {_id: "arms", author: "system", name: "Arms", value: "arms"},
  {_id: "biceps-brachii", author: "system", name: "Biceps Brachii", value: "biceps-brachii", parent: "arms"},
  {_id: "triceps-brachii", author: "system", name: "Triceps Brachii", value: "triceps-brachii", parent: "arms"},
  {_id: "brachialis", author: "system", name: "Brachialis", value: "brachialis", parent: "arms"},
  {_id: "forearms", author: "system", name: "Forearms", value: "forearms", parent: "arms"},

  {_id: "core", author: "system", name: "Core", value: "core"},
  {_id: "rectus-abdominis", author: "system", name: "Rectus Abdominis", value: "rectus-abdominis", parent: "core"},
  {_id: "obliques", author: "system", name: "Obliques", value: "obliques", parent: "core"},
  {_id: "transverse-abdominis", author: "system", name: "Transverse Abdominis", value: "transverse-abdominis", parent: "core"},

  {_id: "glutes", author: "system", name: "Glutes", value: "glutes"},
  {_id: "gluteus-maximus", author: "system", name: "Gluteus Maximus", value: "gluteus-maximus", parent: "glutes"},
  {_id: "gluteus-medius", author: "system", name: "Gluteus Medius", value: "gluteus-medius", parent: "glutes"},
  {_id: "gluteus-minimus", author: "system", name: "Gluteus Minimus", value: "gluteus-minimus", parent: "glutes"},

  {_id: "legs", author: "system", name: "Legs", value: "legs"},
  {_id: "quadriceps", author: "system", name: "Quadriceps", value: "quadriceps", parent: "legs"},
  {_id: "hamstrings", author: "system", name: "Hamstrings", value: "hamstrings", parent: "legs"},
  {_id: "adductors", author: "system", name: "Adductors", value: "adductors", parent: "legs"},
  {_id: "calves", author: "system", name: "Calves", value: "calves", parent: "legs"},
  {_id: "tibialis-anterior", author: "system", name: "Tibialis Anterior", value: "tibialis-anterior", parent: "legs"},

  {_id: "neck-traps", author: "system", name: "Neck & Traps", value: "neck-traps"},
  {_id: "sternocleidomastoid", author: "system", name: "Sternocleidomastoid", value: "sternocleidomastoid", parent: "neck-traps"},
  {_id: "upper-trapezius", author: "system", name: "Upper Trapezius", value: "upper-trapezius", parent: "neck-traps"}
]
