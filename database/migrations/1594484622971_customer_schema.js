'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
	up () {
		this.create('customers', (table) => {
			table.increments();
			table.integer('document').unique().notNullable();
			table.string('first_name',100)
			table.string('second_name',100).nullable();
			table.string('first_last_name',100);
			table.string('second_last_name',100).nullable();
			table.string('email',100).unique().notNullable();
			table.string('address', 200).nullable();
			table.timestamps();
		});
	}

	down () {
		this.drop('customers')
	}
}

module.exports = CustomerSchema
