export interface Workout {
    _id: string;
    name: string;
    description: string;
    difficulty: string;
    targetGroups: TargetGroup[];
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
    targetGroups: TargetGroup[];
    tags: Tag[];
    instructions: string[];
  }
  export interface WorkoutExercise {
    exerciseId: string,
    isCompleted: boolean,
    name: string,
    difficulty: string,
    description: string,
    sets: Set[],
    fields: Field[],
    tags: Tag[];
  }
  export interface WorkoutCategory {
    id: string;
    name: string;
    color: string;
  }
  
  export interface TargetGroup {
    id: string;
    name: string;
    author: string;
  }
  
  export interface Equipment {
    _id: string;
    name: string;
    attributes?: EquipmentAttributes[];
  }
  
  export interface Macro{
    id: string;
    name: string;
    unit: string;
    value: number;
    target: number;
    isEnabled: boolean;
  }
  
  export interface EquipmentAttributes {
    name: string;
    value: number;
    unit: string;
  }
  
  
  export interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
    category?: string;
  }
  
  export interface Goal {
    id: string,
    name: string,
    unit: string,
    target: number,
    icon: string,
    color: string
  }
  export interface BaseLog{
    id: string,
    timestamp: string,
    type: string,
    name: string,
    icon: string,
  }
  export interface GoalLog extends BaseLog{
    data: {
      value: number;
      time: string;
      description: string;
      name: string;
      unit: string;
    }
  }
  export interface Field {
    _id: string,
    name: string,
    unit: string,
    value: number,
    target: number,
    description?: string,
    isCompleted: boolean,
    isEnabled?: boolean,
  }
  export interface ExerciseLog extends BaseLog{
    data: {
      name: string,
      time: string,
      targetGroups: TargetGroup[],
      duration: number,
      fields: Field[]
    }
  }
  export interface FoodLog extends BaseLog{
    data: {
      name: string,
      qty: number,
      unit: string,
      protein: number,
      carbs: number,
      fats: number,
      sugar: number,
      calories: number,
      sodium: number,
      time: string,
      type: string,
      note?: string
  
    }
  }
  export interface Set{
    fields: Field[];
    isCompleted: boolean;
    isSkipped: boolean;
    order: number;
  }

  export interface WorkoutLog extends BaseLog{
    data:{
      duration: string,
      finishedAt: string,
      workoutId: string,
      isCompleted: boolean,
      targetGroups: TargetGroup[],
      name: string,
      difficulty: string,
      description: string,
      exercises: WorkoutExercise[]
    }
  }
  export interface Activity {
    date: string;
    logs: (WorkoutLog | ExerciseLog | FoodLog | GoalLog)[];
    goals: Goal[]
  }
  export interface Section {
    type: string,
    order: number, 
    identifier: string,
  }
  export interface Badges {
    id: string,
    name: string,
    value: number
  }
  export interface InitialStateObject {
    userId: string,
    userData: {
      firstRun: string,
      name?: string,
      username?: string,
      id: string,
      email?: string,
      createdAt: string,
      friends: string[],
      followers: string[],
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
      isPremium: true,
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
    },
    goals: Goal[],
    activity: Activity[],
    preferences: {
      theme: string,
      language: string,
      unitSystem: string,
    },
    defaultFields: Field[],
    tags: Tag[],
    equipment: Equipment[],
    exercises: Exercise[],
    workouts: Workout[],
    message: string | null,
    dashboardSections: Section[],
    macros: Macro[];
}

export interface Phase {
  id: string;
  name: string;
  order: number;
  exercises: WorkoutExercise[];
}
