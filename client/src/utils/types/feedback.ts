type Feedback = {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
  user_id: string;
  list_id: string;
  img?: File;
  title: string;
  body: string;
}

export default Feedback;
