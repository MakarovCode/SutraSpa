class UsersController < ApplicationController

  def index
    @users = User.all.order(first_name: :asc)
    unless params[:document].blank?
      user = @users.find_by_document params[:document]
      redirect_to user_path(user)
    end
  end

  def show
    @user = User.find params[:id]
    @users = User.where(table: @user.table)
  end

end
