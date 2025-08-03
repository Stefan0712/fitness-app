export interface Workout {
    _id: string;
    name: string;
    description: string;
    difficulty: string;
    targetMuscles: TargetGroup[];
    duration: number; 
    equipment: Equipment[];
    createdAt: string; 
    updatedAt?: string; 
    author: string;
    imageUrl?: string; 
    isFavorite: boolean;
    isCompleted: boolean;
    tags?: Tag[];
    visibility: string;
    reference?: string; 
    phases: Phase[];
    notes: string;
    exercises?: any;
  }
  export interface Exercise {
    _id?: string;
    id?: string;
    author: string;
    createdAt: Date; 
    updatedAt: Date;
    isCompleted: boolean;
    sourceId: string;
    name: string;
    description: string;
    reference: string;
    difficulty: string;
    sets: number;
    duration: number;
    durationUnit: string;
    rest: number;
    restUnit: string;
    visibility: string;
    fields: Field[];
    notes: string;
    equipment: Equipment[];
    targetMuscles: TargetGroup[];
    tags: Tag[];
    instructions: string[];
  }
  export interface WorkoutExercise {
    _id: string,
    sourceId: string,
    isCompleted: boolean,
    name: string,
    difficulty: string,
    description: string,
    equipment: Equipment[],
    sets: Set[],
    fields: Field[],
    tags: Tag[];
  }
  
  export interface TargetGroup {
    _id: string;
    name: string;
    author: string;
  }
  
  export interface Equipment {
    _id: string;
    name: string;
    attributes?: EquipmentAttributes[];
  }
  
  export interface Macro{
    _id: string;
    name: string;
    unit: Unit;
    value: number;
    target: number;
    isEnabled: boolean;
  }
  
  export interface EquipmentAttributes {
    name: string;
    value: number;
    unit: Unit;
  }
  
  
  export interface Tag {
    _id: string;
    name: string;
    color: string;
    author: string;
    category?: string;
  }
  
  export interface Goal {
    _id: string,
    name: string,
    unit: Unit,
    target: number,
    icon: string,
    color: string,
    type: string,
    pinToDashboard: string,
    order: number,
    defaultValues?: number[];
  }
  export interface BaseLog{
    _id: string,
    goalId: string,
    timestamp: Date,
    type: 'food'| 'workout' | 'exercise' | 'goal',
    title: string,
    icon: string,
    data: GoalLog | ExerciseLog | WorkoutLog | FoodLog,
  }
  export interface ActivityLog{
    _id: string;
    type: 'activity';
    title: string;
    icon: string;
    timestamp: Date;
    name: string;
    time: string;
    targetMuscles: TargetGroup[];
    tags: Tag[];
    equipment: Equipment[];
    duration: number;
    fields: Field[];
  }
  export interface GoalLog{
    _id: string,
    goalId: string,
    timestamp: Date,
    type: 'goal',
    title: string,
    icon: string,
    data: {
      value: number | string;
      time: string;
      date: string;
      description: string;
      name: string;
      unit: Unit;
      type: 'target' | 'yes-no' | 'number';
    }
  }
  export interface Set {
      exerciseId: string,
      _id?: string,
      isCompleted: boolean,
      isSkipped: boolean,
      rest: number,
      order: number,
      fields: Field[],
      duration: number,
      startedAt: Date | undefined,
      finishedAt: Date | undefined,
      status: 'not-started' | 'idle' | 'running' | 'paused' | 'completed' | 'skipped',
  }
  export interface Field {
    _id: string,
    name: string,
    unit: Unit,
    value: number,
    target: number,
    description?: string,
    isCompleted?: boolean,
    isEnabled?: boolean,
  }
  export interface Unit {
    label: string,
    shortLabel: string,
    value: string,
    category: string
  }
  export interface ExerciseLog{
    _id: string;
    icon: string;
    timestamp: string;
    exerciseId: string,
    duration: number,
    name: string,
    finishedAt: string,
    targetMuscles: TargetGroup[],
    equipment: Equipment[],
    fields: Field[],
    sets: Set[],
    tags: Tag[],
  }
  export interface FoodLog{
    title: string,
    icon: string,
    timestamp: Date,
    _id: string,
    name: string,
    qty: number,
    unit: Unit,
    protein: number,
    carbs: number,
    fats: number,
    sugar: number,
    calories: number,
    sodium: number,
    time: string,
    type: string,
    notes?: string,
    category: string,
  }
  export interface Set{
    fields: Field[];
    isCompleted: boolean;
    order: number;
  }

  export interface WorkoutLog{
      duration: string,
      finishedAt: string,
      startedAt: string,
      workoutId: string,
      isCompleted: boolean,
      targetMuscles: TargetGroup[],
      name: string,
      difficulty: string,
      description: string,
      phases: Phase[]
    
  }
  export interface Section {
    type: string,
    order: number, 
    identifier: string,
  }
  export interface Badges {
    _id: string,
    name: string,
    value: number
  }
  export interface InitialStateObject {
    preferences: {
      theme: string,
      language: string,
      unitSystem: string,
    },
    dashboardSections: Section[],
}

export interface Phase {
  _id: string;
  name: string;
  order: number;
  exercises: WorkoutExercise[];
}
export interface userData {
    firstRun: string,
    name?: string,
    username?: string,
    _id: string,
    type: "local" | "online",
    isLinked: boolean,
    linkedTo: string,
    lastSync: Date | '',
    updatedAt: Date,
    email?: string,
    createdAt: Date,
    friends: string[],
    followers: string[],
    role: string,
    following: string[],
    comments: string[],
    posts: string[],
    likes: string[],
    savedPosts: string[],
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    bio?: string,
    isPrivate: boolean,
    isPremium: boolean,
    profileSettings: {
      showMyWorkouts: string,
      showProfile: string,
      showMyExercises: string,
      showMyActivity: string,
      showMyDetails: string,
      showMyPlans: string,
      showMyPosts: string
    },
    badges: Badges[]
  }
