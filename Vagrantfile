# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
	config.vm.box = "ubuntu/trusty64"
	config.vm.synced_folder ".", "/home/vagrant/serverless", create: true
	config.vm.provider "virtualbox" do |v|
		v.memory = 512
	end
	config.vm.provision "shell", inline: <<-SHELL
		echo 'LC_ALL=en_US.UTF-8' >> /etc/environment
		echo 'LANG=en_US.UTF-8' >> /etc/environment
		apt-get update -y
		apt-get install -y build-essential
		curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
		sudo apt-get install -y nodejs
		sudo npm install -g serverless
	SHELL
end
