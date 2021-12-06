ActiveAdmin.register User do

  permit_params :first_name, :last_name, :document, :table

  filter :document
  filter :first_name
  filter :last_name

  action_item "" do
    link_to("Subir excel", csv_load_admin_users_path)
  end

  index do
    column :document
    column :first_name
    column :last_name
    column :table
    actions
  end

  form do |f|
    f.inputs "Datos invitado"  do
      f.input :first_name
      f.input :last_name
      f.input :document
      f.input :table
    end
    f.actions
  end

  collection_action :do_csv_load, method: :post do

    if params[:file].blank?
      redirect_to csv_load_admin_users_path, alert: "Debes seleccionar un archivo para ser cargado"
      return
    end

    #### Nota: Con Excel
    User.csv_load(params[:file])
    render "csv_load"

    redirect_to csv_load_admin_users_path, alert: "Invitados cargados"
  end

  collection_action :csv_load, method: :get, title: "Carga por excel" do

  end

end
