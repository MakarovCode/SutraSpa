class Api::V1::UsersController < ApiController

  def update
    user = User.find params[:id]

    if user.update permitted_params
      render status: 200, json: {
        message: "User information was succesfully updated"
      }
    else
      render status: 411, json: {
        errors: user.errors.as_json
      }
    end
  end

  private

  def permitted_params
    params.require(:user).permit(
      :username,
      :first_name,
      :last_name,
      :email,
      :phone,
      :photo,
      :bio,
      :bg_color
    )
  end

end
