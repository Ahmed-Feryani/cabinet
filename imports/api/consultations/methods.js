import { Meteor } from "meteor/meteor";
import { ConsultationCollection } from "./consultation";

Meteor.methods({
  "consultation.insert"(
    userId,
    objective,
    toothNumber,
    act,
    next_date,
    remark,
    price,
    patient_name,
    patient_lastName,
    medicament_name,
    usage
  ) {
    console.log('inserting')
    ConsultationCollection.insert({
      userId,
      objective,
      toothNumber,
      act,
      next_date,
      remark,
      price,
      ordonnance: {
        patient_name,
        patient_lastName,
        medicament: {
          medicament_name,
          usage,
        },
      },
      createdAt: Date.now(),
    });
  },
});
