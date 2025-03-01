
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchAbleFields } from './user.constant';
import { User } from './user.model';



const getAllUsersFromDB = async (query:Record<string,unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async(email:string)=>{
  const result = await User.findOne({email})
  return result
}

const deleteUserFormDB = async(id:string)=>{
  const result = await User.findOneAndDelete({_id:id})
 
  return result
}

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFormDB
};
