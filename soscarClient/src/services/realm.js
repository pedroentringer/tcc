import Realm from "realm";

import TokenSchema from "../schemas/Token";
import UserSchema from "../schemas/User";
import NewUserSchema from "../schemas/NewUser";
import VehicleSchema from "../schemas/Vehicle";

export default function getRealm() {
    return Realm.open({
        schema: [TokenSchema, UserSchema, NewUserSchema, VehicleSchema]
    });
}
